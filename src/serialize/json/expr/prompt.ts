import { Prompt } from '../../../context/expr'
import { SerializationContext } from '../../../context'


export default (prompt: Prompt, context: SerializationContext) => ({
  prompt: prompt.msg,
  ...(prompt._default ? { default: context.serializeExpr(prompt._default, context) } : {}),
})
