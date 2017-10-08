import type { AbstractTree } from '../type'

/**
 * transform to human readable tree
 */
export const toString = (tree: AbstractTree, prefix?: string = '') => {
    return [
        prefix +
            tree.type +
            ' ' +
            (tree.text ? ` '${tree.text}'` : '') +
            (tree.src || ''),
        ...(tree.children && tree.children.length
            ? [
                  //   prefix + '[',
                  ...[].concat(
                      ...tree.children.map(c => toString(c, prefix + '  '))
                  ),
                  //   prefix + ']',
              ]
            : []),
    ].join('\n')
}

/**
 * return the first subtree which validate the matching function
 */
export const find = <T: AbstractTree>(
    match: (tree: T, path: string[], ancestors: T[]) => boolean,
    tree: T,
    ancestors?: T[] = []
): T | null =>
    match(tree, [tree, ...ancestors].reverse().map(x => x.type), ancestors)
        ? tree
        : tree.children.reduce(
              (f, c) => f || find(match, c, [tree, ...ancestors]),
              null
          )

/**
* return all the subtree which validate the matching function
*/
export const findAll = <T: AbstractTree>(
    match: (tree: T, path: string[], ancestors: T[]) => boolean,
    tree: T,
    matched?: T[] = []
): T[] => {
    const f = find(
        (x, ...rest) => match(x, ...rest) && matched.indexOf(x) === -1,
        tree
    )
    return f ? findAll(match, tree, [...matched, f]) : matched
}

/**
* remove the subtree
*/
export const prune = <T: AbstractTree>(tree: T, subTreeToRemove: T): T => ({
    ...tree,
    children: tree.children
        .filter(x => x != subTreeToRemove)
        .map(x => prune(x, subTreeToRemove)),
})

/**
* read the tree and concat the text node
*/
export const extractText = (tree): string => {
    let next = tree.children.reduce((s, c) => s + extractText(c), '')

    if ('\n' === next[next.length - 1]) next = next.slice(0, -1)

    switch (tree.type) {
        case 'text':
            return tree.text || ''

        case 'textBlock':
            return next + '\n'

        case 'softbreak':
            return '\n'

        default:
            return next
    }
}
