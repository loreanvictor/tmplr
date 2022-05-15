import { Remove } from '../../../context/command'
import { SerializationContext } from '../base'


export default (remove: Remove, context: SerializationContext) => ({
  remove: context.serializeExpr(remove.target, context),
})
