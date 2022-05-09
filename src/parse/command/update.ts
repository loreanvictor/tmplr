import { Update } from '../../context/command'
import { ParsingContext } from '../base'


export function parseUpdate(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (!obj.update) {
    throw new Error('Expected "update" field.')
  }

  return new Update(
    obj.update,
    context.scope,
    context.changeLog,
  )
}
