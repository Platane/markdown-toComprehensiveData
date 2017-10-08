import { extractText } from '../utils'

/**
 * transform the text block in imageblock
 * when the textBlock contains only images
 */
const seperateImageParagraph = textBlockChildren => {
    if (!textBlockChildren.length) return []

    const i = textBlockChildren.findIndex(({ type }) => 'image' === type)

    switch (i) {
        case -1:
            return [
                {
                    type: 'textBlock',
                    children: textBlockChildren,
                },
            ]

        case 0:
            let k = textBlockChildren.findIndex(
                tree => 'image' !== tree.type && extractText(tree).trim()
            )
            k = k === -1 ? Infinity : k

            return [
                {
                    type: 'imageGroup',
                    children: textBlockChildren
                        .slice(0, k)
                        .filter(({ type }) => 'image' === type),
                },
                ...seperateImageParagraph(textBlockChildren.slice(k)),
            ]

        default:
            return [
                {
                    type: 'textBlock',
                    children: textBlockChildren.slice(0, i),
                },
                ...seperateImageParagraph(textBlockChildren.slice(i)),
            ]
    }
}

export const renameImageBlock = tree => ({
    ...tree,
    children: [].concat(
        ...tree.children.map(
            c =>
                'textBlock' === c.type
                    ? seperateImageParagraph(c.children)
                    : [renameImageBlock(c)]
        )
    ),
})
