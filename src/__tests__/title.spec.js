import { parse } from '../index'

it('should have a title', () => {
    const sample = `
yolo
===

asdasd
`

    expect(parse(sample).title).toBe('yolo')
})

it('should have removed the heading from the ast', () => {
    const sample = `

yolo
===


`

    expect(parse(sample).children).toEqual([])
})
