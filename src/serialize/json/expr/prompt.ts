import { Prompt } from '../../../context/command'
import { SerializationContext } from '../base'


export default (prompt: Prompt, context: SerializationContext) => ({
  prompt: prompt.msg,
  ...(prompt._default ? { default: context.serializeExpr(prompt._default, context) } : {}),
})
