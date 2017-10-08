import { findAll } from '../index'

it('should find all matching nodes', () => {
    const tree = {
        type: 'paragraph',
        children: [
            { type: 'text', text: 'A1', children: [] },
            { type: 'text', text: 'B1', children: [] },
            { type: 'text', text: 'B2', children: [] },
            { type: 'text', text: 'C1', children: [] },
        ],
    }

    expect(
        findAll(({ text }) => text && text[0] == 'B', tree).map(x => x.text)
    ).toEqual(['B1', 'B2'])
})
