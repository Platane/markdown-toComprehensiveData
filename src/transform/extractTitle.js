import { find, extractText, prune } from '../utils'

/*
 * The title is the fist heading
 *
 * which in markdown is declared as
 *
 * ```
 * Title
 * =====
 *
 *
 * ```
 *
 * As outputed by markdownIt, it looks like
 *
 * heading
 *
 */

export const extractTitle = tree => {
    const meta = {}

    if (tree.children[0] && tree.children[0].type !== 'heading')
        return { ...tree, title: null }

    const title = extractText(tree.children[0])

    return { ...tree, title, children: tree.children.slice(1) }
}
