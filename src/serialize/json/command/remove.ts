import { Remove } from '../../../context/command'
import { SerializationContext } from '../../../context'


export default (remove: Remove, context: SerializationContext) => ({
  remove: context.serializeExpr(remove.target, context),
})
