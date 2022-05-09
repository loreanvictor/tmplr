import { Provider } from './provider'
import { Store, createStore } from './store'


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
