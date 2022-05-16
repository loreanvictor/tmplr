import { Value } from '../../context/expr'
import { ParsingContext } from '../base'


export function parseValue(_: ParsingContext, obj: any) {
  if (typeof obj !== 'string') {
    throw new Error('expected string')
  }

  return new Value(obj)
}
