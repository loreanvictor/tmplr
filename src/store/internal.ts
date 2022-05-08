import { Provider, createStore } from './base'
import git from './git'
import env from './env'
import path from './path'


const _Providers: {[key: string]: Provider} = { git, env, path, }
const _Vars: {[key: string]: string} = {}



export function set(key: string, value: string) {
  _Vars[key] = value
}


export default createStore(_Providers, _Vars)
