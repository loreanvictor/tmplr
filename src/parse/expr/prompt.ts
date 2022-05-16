import { Prompt } from '../../context/expr'
import { ParsingContext } from '../base'


export function parsePrompt(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('expected object')
  }

  if (!obj.prompt) {
    throw new Error('expected "prompt" field')
  }

  return new Prompt(
    obj.prompt,
    obj.default ? context.parseExpr(context, obj.default) : undefined,
  )
}
