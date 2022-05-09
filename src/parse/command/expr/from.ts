import { From } from '../../../context/command'
import { ParsingContext } from '../../base'


export function parseFrom(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('expected object')
  }

  if (!obj.from) {
    throw new Error('expected "from" field')
  }

  return new From(
    context.scope,
    obj.from,
    obj.fallback ? context.parseExpr(context, obj.fallback) : undefined,
  )
}
