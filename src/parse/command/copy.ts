import { Copy } from '../../context/command'
import { ParsingContext } from '../base'


export function parseCopy(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (!obj.copy) {
    throw new Error('Expected "copy" field.')
  }

  if (!obj.to) {
    throw new Error('Expected "to" field.')
  }

  return new Copy(
    context.parseExpr(context, obj.copy),
    context.parseExpr(context, obj.to),
    context.stack.varStore,
    context.root,
    context.changeLog,
  )
}
