import { Degit } from '../../context/command'
import { ParsingContext } from '../base'


export function parseDegit(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (!obj.degit) {
    throw new Error('Expected "degit" field.')
  }

  return new Degit(
    context.parseExpr(context, obj.degit),
    obj.to ? context.parseExpr(context, obj.to) : undefined,
    context.changeLog,
  )
}
