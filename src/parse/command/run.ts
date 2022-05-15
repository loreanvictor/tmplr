import { Run } from '../../context/command'
import { ParsingContext } from '../base'


export function parseRun(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (!obj.run) {
    throw new Error('Expected "run" field.')
  }

  return new Run(
    context.parseExpr(context, obj.run),
    (code, root) => context.parseCommand({ ...context, root }, code),
    context.root,
  )
}
