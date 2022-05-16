import { Expr } from '../expr/base'
import { Provider } from './base'
import { cached } from './util/cached'


export function createLazyProvider(exprs: {[name: string]: Expr}): Provider {
  const cache = {}
  Object.entries(exprs).forEach(([name, expr]) => cache[name] = cached(() => expr.eval()))

  return {
    has: (key: string) => key in cache,
    get: (key: string) => cache[key]
  }
}
