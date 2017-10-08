import { parse } from '../index'

it('should have a meta field, containing the front matter', () => {
    const sample = `
yolo
===

---
meta1: 2
meta2: 3
---
`

    expect(parse(sample).meta).toEqual({ meta1: '2', meta2: '3' })
})

it('should have a meta field, containing the front matter, even with no title', () => {
    const sample = `

---
meta1: 2
meta2: 3
---
`

    expect(parse(sample).meta).toEqual({ meta1: '2', meta2: '3' })
})

it('should have removed the heading from the ast', () => {
    const sample = `

---
meta1: 2
meta2: 3
---


`

    expect(parse(sample).children).toEqual([])
})
