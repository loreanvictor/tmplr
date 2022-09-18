import { Context } from './base'
import { createStack } from './stack'
import { git, env, path, tmpdir } from './provider'
import { createChangeLog } from './command'


export function createContext(): Context {
  return {
    stack: createStack({ git, env, path, tmpdir }, {}, 'tmplr'),
    changeLog: createChangeLog(),
  }
}


export * from './base'
export * from './runnable'
export * from './execution'

// TODO: deprecate this package
