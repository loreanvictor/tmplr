import { Provider } from './provider'


export interface Store {
  get(key: string): Promise<string>
  has(key: string): boolean
  cleanup(): Promise<void>
}


export function createStore(providers: {[namespace: string]: Provider}, vars: {[key: string]: string}): Store {
  return {
    async get(addr: string) {
      const [namespace, key] = addr.split('.')

      if (!key) {
        if (namespace! in vars) {
          return vars[namespace!]!
        }

        throw new Error(`Unknown variable: ${addr}`)
      } else {
        if (namespace! in providers) {
          const provider = providers[namespace!]
          if (!provider!.has(key)) {
            throw new Error(`Provider ${namespace} does not have a key ${key}`)
          }

          return await provider!.get(key)()
        }

        throw new Error(`Unknown provider: ${namespace}`)
      }
    },

    has(addr: string) {
      const [namespace, key] = addr.split('.')

      if (!key) {
        return namespace! in vars
      } else {
        return namespace! in providers && providers[namespace!]!.has(key)
      }
    },

    async cleanup() {
      for (const provider of Object.values(providers)) {
        if (provider!.cleanup) {
          await provider!.cleanup()
        }
      }
    }
  }
}


export const NULL_STORE: Store = {
  get: async () => { throw new Error('Cannot get values on a null store') },
  has: () => false,
  cleanup: async () => {},
}
