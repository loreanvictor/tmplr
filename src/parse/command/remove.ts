import { Remove } from '../../context/command'
import { ParsingContext } from '../base'


export function parseRemove(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (!obj.remove) {
    throw new Error('Expected "remove" field.')
  }

  return new Remove(
    context.parseExpr(context, obj.remove),
    context.root,
    context.changeLog,
  )
}
