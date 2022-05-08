import { Store } from './store'


export async function evaluate(store: Store, text: string) {
  const RE = /{{(\s*[A-Za-z]\w*(?:\.[A-Za-z]\w*)?\s*)}}/g

  return (
    await Promise.all(
      text.split(RE).map(async (piece, i) => {
        if (i % 2 === 0) {
          return piece
        }

        const addr = piece.trim()

        if (store.has(addr)) {
          return await store.get(addr)
        } else {
          return `{{${piece}}}`
        }
      })
    )
  ).join('')
}
