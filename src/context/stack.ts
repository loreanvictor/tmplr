import { Store, NULL_STORE } from './store'
import { createScope, Scope, NULL_SCOPE } from './scope'
import { Provider } from './provider'


export interface Stack extends Scope {
  varStore: Store,
  sub: (_: {[namespace: string]: Provider}) => Stack,
}


function createVarStore(scope: Scope, prefix: string): Store {
  const pre = prefix + '.'

  return {
    has(key: string) {
      return key.startsWith(pre) && scope.has(key.slice(pre.length))
    },
    async get(key: string) {
      return await scope.get(key.slice(pre.length))
    },
    async cleanup() { }
  }
}


export function createStack(
  providers: {[namespace: string]: Provider},
  vars: {[key: string]: string},
  prefix: string,
): Stack {
  const scope = createScope(providers, vars)
  const varStore = createVarStore(scope, prefix)
  const snapshot = { ...vars }

  const sub = (additionalProviders: {[namespace: string]: Provider} = {}) => {
    return createStack({ ...providers, ...additionalProviders }, { ...snapshot }, prefix)
  }

  return {
    ...scope,
    varStore,
    sub,
  }
}


export const NULL_STACK: Stack = {
  ...NULL_SCOPE,
  varStore: NULL_STORE,
  sub: () => NULL_STACK,
}
