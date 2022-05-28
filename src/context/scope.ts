import { Provider } from './provider'
import { Store, createStore, NULL_STORE } from './store'


export interface Scope extends Store {
  set(variable: string, value: string): Promise<void>
}


export function createScope(providers: {[namespace: string]: Provider}, vars: {[key: string]: string}) {
  return {
    ...createStore(providers, vars),
    async set(variable: string, value: string) {
      vars[variable] = value
    }
  }
}


export const NULL_SCOPE: Scope = {
  ...NULL_STORE,
  set: async () => {
    throw new Error('Cannot set values on a null scope')
  },
}
