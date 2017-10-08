export type AbstractTree = {
    children: AbstractTree[],
    type: string,
}

export type Image = {
    type: 'image',
    src: string,
    alt: string,
}

export type Inline =
    | {
          type: 'text',
          text: string,
      }
    | {
          type: 'bold',
          children: Inline[],
      }
    | {
          type: 'code',
          children: Inline[],
          text: string,
      }
    | {
          type: 'italic',
          children: Inline[],
      }
    | {
          type: 'link',
          href: string,
          children: Inline[],
      }
    | {
          type: 'softbreak',
      }

export type Block =
    | {
          type: 'textBlock',
          children: Inline[],
          text: string,
      }
    | {
          type: 'imageGroup',
          children: Image[],
      }
    | {
          type: 'codeBlock',
          children: Block[],
      }
    | {
          type: 'quoteBlock',
          children: Block[],
          anotation: string,
      }
    | {
          type: 'listBlock',
          children: Block[],
      }

export type Doc = {
    title: string,
    type: 'doc',
    meta: {
        [string]: string,
    },
    children: Block[],
}
