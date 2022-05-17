import { Exit } from '../../../context/command'
import { SerializationContext } from '../base'


export default (exit: Exit, context: SerializationContext) => ({
  exit: context.serializeExpr(exit.msg, context),
})
