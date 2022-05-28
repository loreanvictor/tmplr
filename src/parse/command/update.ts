import { Update } from '../../context/command'
import { ParsingContext } from '../../context'


export function parseUpdate(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (!obj.update) {
    throw new Error('Expected "update" field.')
  }

  return new Update(
    context.parseExpr(context, obj.update),
    context.stack.varStore,
    context.root,
    context.changeLog,
  )
}
