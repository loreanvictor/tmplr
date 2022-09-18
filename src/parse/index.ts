import { parse as parseYaml } from 'yaml'

import { createContext, createExecution, Execution } from '../context'
import { parseExpr } from './expr'
import { parseCommand } from './command'



export function parse(obj: string | object, root = process.cwd()): Execution {
  if (typeof obj === 'string') {
    return parse(parseYaml(obj))
  } else {
    const context = createContext()
    const command = parseCommand({
      ...context,
      parseCommand,
      parseExpr,
      root,
    }, obj)

    return createExecution(command, context)
  }
}


// TODO: deprecate this package
