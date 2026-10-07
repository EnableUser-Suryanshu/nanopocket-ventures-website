/** Tiny helper to build Lexical rich-text JSON for seeded pages. */
type Node = { h2?: string; h3?: string; p?: string; ul?: string[] }

const text = (value: string) => ({
  type: 'text',
  text: value,
  format: 0,
  style: '',
  mode: 'normal',
  detail: 0,
  version: 1,
})

const base = { format: '', indent: 0, version: 1, direction: 'ltr' as const }

export function lexical(nodes: Node[]) {
  const children = nodes.map((n) => {
    if (n.h2 || n.h3) {
      return {
        ...base,
        type: 'heading',
        tag: n.h2 ? 'h2' : 'h3',
        children: [text((n.h2 || n.h3) as string)],
      }
    }
    if (n.ul) {
      return {
        ...base,
        type: 'list',
        listType: 'bullet',
        start: 1,
        tag: 'ul',
        children: n.ul.map((item, i) => ({
          ...base,
          type: 'listitem',
          value: i + 1,
          children: [text(item)],
        })),
      }
    }
    return { ...base, type: 'paragraph', textFormat: 0, textStyle: '', children: [text(n.p || '')] }
  })
  return { root: { ...base, type: 'root', children } }
}
