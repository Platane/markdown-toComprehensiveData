/*
 *
 * A list in markdown is declared as
 *
 * ```
 * - one
 * - two
 *
 * ```
 *
 * As outputed by markdownIt, it looks like
 *
 * bullet
 *  list
 *    paragraph
 *  list
 *    paragraph
 *
 */

const pruneList = tree => ({
    ...tree,
    children: [].concat(
        ...tree.children.map(
            c =>
                'list' === c.type ? c.children.map(pruneList) : [pruneList(c)]
        )
    ),
})

const renameBullet = tree => ({
    ...tree,
    type: tree.type === 'bullet' ? 'list' : tree.type,
    children: tree.children.map(renameBullet),
})

export const transformList = tree => renameBullet(pruneList(tree))
