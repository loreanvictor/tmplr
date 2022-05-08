import { CachedFunction } from '../util/cached'


export interface Provider {
  get(key: string): CachedFunction<string>
  has(key: string): boolean
}


export function createProvider(map: { [key: string]: CachedFunction<string> }): Provider {
  return {
    get(key: string) {
      if (!(key in map)) {
        throw new Error(`Provider does not have key: ${key}`)
      }

      return map[key]!
    },
    has(key: string) {
      return key in map
    }
  }
}


export interface Store {
  get(key: string): Promise<string>
  has(key: string): boolean
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
    }
  }
}
