import { CachedFunction } from '../util/cached'


export interface Provider {
  get(key: string): CachedFunction<string>
  has(key: string): boolean
}


export function createProvider(map: { [key: string]: CachedFunction<string> }): Provider {
  return {
    get(key: string) {
      return map[key]!
    },
    has(key: string) {
      return key in map
    }
  }
}
