import { Context, NULL_CONTEXT } from './base'
import { Command } from './command'


export interface Execution {
  context: Context,
  command: Command,
  run: () => Promise<void>,
}


export function createExecution(command: Command, context: Context = NULL_CONTEXT) {
  return {
    context,
    command,
    run: async () => {
      try {
        await command.run()
      } finally {
        await context.stack.cleanup()
      }
    }
  }
}
