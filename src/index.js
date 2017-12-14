const MarkdownIt = require('markdown-it')
const markdownIt = new MarkdownIt()

import { extractText } from './utils'
import { buildTreeFactory } from './treeBuilder'

import { extractMeta } from './transform/extractMeta'
import { extractTitle } from './transform/extractTitle'
import { pruneInline } from './transform/pruneInline'
import { renameImageBlock } from './transform/renameImageBlock'
import { transformList } from './transform/transformList'

import type { Doc } from './type'

const isOpening = ({ nesting }) => nesting === 1

const isClosing = ({ nesting }) => nesting === -1

const getType = ({ type }) => {
    const t = type.split('_')[0]
    switch (t) {
        case 'strong':
            return 'bold'
        case 'em':
            return 'italic'
        case 'fence':
            return 'codeBlock'
        case 'paragraph':
            return 'textBlock'
        case 'blockquote':
            return 'quoteBlock'
        default:
            return t
    }
}

const getContent = x => {
    switch (getType(x)) {
        case 'inline':
            const node = buildTree(x.children)

            node.type = x.type

            return node

        case 'text':
            return { text: x.content }

        case 'image': {
            const subTree = buildTree(x.children)

            return {
                src: x.attrs.find(a => a[0] == 'src')[1],
                alt: extractText(subTree),
            }
        }

        case 'link':
            return {
                href: x.attrs.find(a => a[0] == 'href')[1],
            }

        case 'code':
            return {
                text: x.content,
            }

        case 'codeBlock':
            return {
                text: x.content,
                anotation: x.info,
            }

        case 'heading': {
            return {
                importance: +x.tag[1],
            }
        }

        default:
            return {}
    }
}

const buildTree = buildTreeFactory({
    isOpening,
    isClosing,
    getType,
    getContent,
})

const compose = (...fns) => x => fns.reduceRight((res, fn) => fn(res), x)

export const parse = (text: string): Doc => {
    const tokens = markdownIt.parse(text, {})

    return compose(
        transformList,
        renameImageBlock,
        extractMeta,
        extractTitle,
        pruneInline
    )(buildTree(tokens))
}
