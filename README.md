markdown-toComprehensiveData
====

Parse a markdown subset as comprehensive data.

> ⚠ This parser does not cover the entire markdown languages.

## Motivation

This project exists because I did not find suitables solutions to parse markdown when :
- I want to output json ( and not directly html )
- I want something more usable than a complexe AST

## Example

```
this is a title
=====

---
date: 03/04/1978
somethingMeta: hello
---

This is my first paragraph.
This is a second __line__

![](link/to/image)
![](link/to/another/image)
```

Is parsed as

```javascript
{
   type: 'doc',
   title: 'this is a title',
   meta: {
       date: '03/04/1978',
       somethingMeta: 'hello',
   },
   children: [
       {
           type: 'textBlock',
           children: [
               {
                   type: 'text',
                   text: 'This is my first paragraph.',
               },
               {
                   type: 'softbreak',
               },
               {
                   type: 'text',
                   text: 'This is a second ',
               },
               {
                   type: 'bold',
                   children: [
                       {
                           type: 'text',
                           text: 'line',
                       },
                   ],
               },
           ],
       },
       {
           type: 'imageGroup',
           children: [
               {
                   src: 'link/to/image',
                   type: 'image',
               },
               {
                   src: 'link/to/another/image',
                   type: 'image',
               },
           ],
       },
   ],
}
```

or in a more consive writing :
```
doc 
  textBlock 
    text  'This is my first paragraph.'
    softbreak 
    text  'This is a second '
    bold 
      text  'line'
  imageGroup 
    image link/to/image
    image link/to/another/image
```

## Usage

```js
import { parse } from 'markdown-toComprehensiveData'

const Doc = parse( text )

```

The data structure is described as flow type in [src/type.js](./src/type.js).

However I did not take the time to have a nice flow coverage. Let's the type are more of a documentation. :[