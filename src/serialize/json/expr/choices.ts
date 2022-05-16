import { Choices } from '../../../context/expr'
import { SerializationContext } from '../base'


export default (choices: Choices, context: SerializationContext) => ({
  prompt: choices.msg,
  choices: choices.choices.map(choice => ({
    [choice.label]: context.serializeExpr(choice.value, context)
  }))
})
