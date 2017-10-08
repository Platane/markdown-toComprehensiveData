import { find } from '../index'

it('should find the matching node', () => {
    const tree = {
        type: 'paragraph',
        children: [
            { type: 'text', text: 'A', children: [] },
            { type: 'text', text: 'B', children: [] },
            { type: 'text', text: 'C', children: [] },
        ],
    }

    expect(find(({ text }) => text == 'B', tree).text).toBe('B')
})
