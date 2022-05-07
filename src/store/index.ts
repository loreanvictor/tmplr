import { Provider } from './base'
import git from './git'
import env from './env'
import path from './path'


const _Providers: {[key: string]: Provider} = { git, env, path, }
const _Vars: {[key: string]: string} = {}


export async function get(addr: string): Promise<string> {
  const [namespace, key] = addr.split('.')

  if (!key) {
    if (namespace! in _Vars) {
      return _Vars[namespace!]!
    }

    throw new Error(`Unknown variable: ${addr}`)
  } else {
    if (namespace! in _Providers) {
      const provider = _Providers[namespace!]
      if (!provider!.has(key)) {
        throw new Error(`Provider ${namespace} does not have a key ${key}`)
      }

      return await provider!.get(key)()
    }

    throw new Error(`Unknown provider: ${namespace}`)
  }
}


export function set(key: string, value: string) {
  _Vars[key] = value
}
