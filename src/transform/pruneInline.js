export const pruneInline = tree =>
    Object.assign(tree, {
        children: [].concat(
            ...tree.children.map(
                c =>
                    'inline' === c.type
                        ? c.children.map(pruneInline)
                        : [pruneInline(c)]
            )
        ),
    })
