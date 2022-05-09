import { Context } from './base'
import { createScope } from './scope'
import { git, env, path } from './provider'
import { createChangeLog } from './command'



export function createContext(): Context {
  return {
    scope: createScope({ git, env, path }, {}),
    changeLog: createChangeLog(),
  }
}


export * from './base'

