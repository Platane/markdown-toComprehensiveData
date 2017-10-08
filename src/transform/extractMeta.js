import { find, extractText, prune } from '../utils'

/*
 * The meta is contained in the front matter block
 *
 * which in markdown is declared as
 *
 * ```
 * Title
 * =====
 *
 * ---
 * metaKey1 : something
 * metaKey2 : something
 * ---
 *
 * ```
 *
 * As outputed by markdownIt, it looks like
 *
 * heading
 * hr
 * heading
 *  text "metaKey1 : something"
 *  text "metaKey2 : something"
 *
 */

export const extractMeta = tree => {
    const meta = {}

    const hrIndex = tree.children.findIndex(x => x.type === 'hr')

    if (hrIndex === -1) return { ...tree, meta }

    if (
        hrIndex > 2 &&
        tree.children.slice(0, hrIndex).some(x => x.type !== 'heading')
    )
        return { ...tree, meta }

    const hrBlock = tree.children[hrIndex]
    const metaBlock = tree.children[hrIndex + 1]

    if (metaBlock.type !== 'heading') return { ...tree, meta }

    const text = extractText(metaBlock)

    text.split('\n').forEach(line => {
        const [key, value] = line.split(':', 2)

        meta[key.trim()] = value.trim()
    })

    return {
        ...tree,
        meta,
        children: [
            ...tree.children.slice(0, hrIndex),
            ...tree.children.slice(hrIndex + 2),
        ],
    }
}
