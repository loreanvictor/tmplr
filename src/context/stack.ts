import { Store } from './store'
import { createScope, Scope } from './scope'
import { Provider } from './provider'


export interface Stack extends Scope {
  varStore: Store
}


export function createStack(
  providers: {[namespace: string]: Provider},
  vars: {[key: string]: string},
  prefix: string,
) {
  const pre = prefix + '.'
  const scope = createScope(providers, vars)
  const varStore = {
    has(key: string) {
      return key.startsWith(pre) && scope.has(key.slice(pre.length))
    },
    async get(key: string) {
      return await scope.get(key.slice(pre.length))
    }
  }

  return {
    ...scope,
    varStore,
  }
}
