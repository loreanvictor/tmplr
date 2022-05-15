import { Read } from '../../../context/command'
import { SerializationContext } from '../base'


export default (read: Read, context: SerializationContext) => ({
  read: read.variable,
  ...context.serializeExpr(read.expr, context),
})
