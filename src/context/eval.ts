import { Store } from './store'
import { parse } from './pipe'


export async function evaluate(store: Store, text: string) {
  const RE = /{{(\s*[A-Za-z]\w*(?:\.[A-Za-z]\w*)?(?:\s*\|\s*[^:]+(?::[^:]+)?\s*)*\s*)}}/g

  return (
    await Promise.all(
      text.split(RE).map(async (piece, i) => {
        if (i % 2 === 0) {
          return piece
        }

        const [addr, ...pipes] = piece.split('|').map(_ => _.trim())

        if (store.has(addr!)) {
          try {
            return pipes.map(parse).reduce((res, pipe) => pipe(res), await store.get(addr!))
          } catch {
            return `{{${piece}}}`
          }
        } else {
          return `{{${piece}}}`
        }
      })
    )
  ).join('')
}
