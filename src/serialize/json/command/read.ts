import { Read } from '../../../context/command'
import { SerializationContext } from '../../../context'


export default (read: Read, context: SerializationContext) => ({
  read: read.variable,
  ...context.serializeExpr(read.expr, context),
})
