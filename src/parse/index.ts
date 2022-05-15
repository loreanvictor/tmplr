import { parse as parseYaml } from 'yaml'

import { createContext, Context } from '../context'
import { Command } from '../context/command'
import { parseExpr } from './expr'
import { parseCommand } from './command'


export interface Execution {
  context: Context
  command: Command,
  run: () => Promise<void>,
}


export function parse(obj: string | object, root = '.'): Execution {
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

    const run = async () => {
      try {
        await command.run()
      } finally {
        await context.stack.cleanup()
      }
    }

    return { context, command, run }
  }
}
