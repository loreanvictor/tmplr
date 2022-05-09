import { Read } from '../../context/command'
import { ParsingContext } from '../base'


export function parseRead(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (!obj.read) {
    throw new Error('Expected "read" field.')
  }

  return new Read(
    obj.read,
    context.parseExpr(context, obj),
    context.scope,
  )
}
