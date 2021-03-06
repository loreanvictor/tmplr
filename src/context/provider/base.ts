import { CachedFunction } from './util/cached'


export interface Provider {
  get(key: string): CachedFunction<string>
  has(key: string): boolean
  cleanup?(): Promise<void>
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
