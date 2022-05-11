import { parse as parseYaml } from 'yaml'

import { createContext, Context } from '../context'
import { Command } from '../context/command'
import { parseExpr } from './command/expr'
import { parseCommand } from './command'


export interface Execution {
  context: Context
  command: Command
}


export function parse(obj: string | object): Execution {
  if (typeof obj === 'string') {
    return parse(parseYaml(obj))
  } else {
    const context = createContext()
    const command = parseCommand({
      ...context,
      parseCommand,
      parseExpr
    }, obj)

    return { context, command }
  }
}
