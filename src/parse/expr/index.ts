import { ParsingContext } from '../../context'
import { parseChoices } from './choices'
import { parseEval } from './eval'
import { parseFrom } from './from'
import { parsePrompt } from './prompt'
import { parseValue } from './value'
import { parsePath } from './path'


export function parseExpr(context: ParsingContext, obj: any) {
  if (typeof obj === 'string') {
    return parseValue(context, obj)
  }

  if (typeof obj !== 'object') {
    throw new Error('Expected object or string.')
  }

  if (obj.from) {
    return parseFrom(context, obj)
  } else if (obj.choices) {
    return parseChoices(context, obj)
  } else if (obj.prompt) {
    return parsePrompt(context, obj)
  } else if (obj.eval) {
    return parseEval(context, obj)
  } else if (obj.path) {
    return parsePath(context, obj)
  }

  throw new Error('Expected "from", "choices", "prompt", or "eval".')
}
