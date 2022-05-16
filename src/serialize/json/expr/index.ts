import { Choices, Eval, Expr, From, Path, Prompt, Value } from '../../../context/expr'
import { SerializationContext } from '../base'

import serializeChoices from './choices'
import serializeEval from './eval'
import serializeFrom from './from'
import serializePrompt from './prompt'
import serializeValue from './value'
import serializePath from './path'


export default (expr: Expr, context: SerializationContext) => {
  if (expr instanceof Choices) {
    return serializeChoices(expr, context)
  } else if (expr instanceof Eval) {
    return serializeEval(expr, context)
  } else if (expr instanceof From) {
    return serializeFrom(expr, context)
  } else if (expr instanceof Prompt) {
    return serializePrompt(expr, context)
  } else if (expr instanceof Value) {
    return serializeValue(expr, context)
  } else if (expr instanceof Path) {
    return serializePath(expr, context)
  }

  throw new Error(`Unsupported expression type: ${expr.constructor.name}`)
}
