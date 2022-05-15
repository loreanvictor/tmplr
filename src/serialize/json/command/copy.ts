import { Copy } from '../../../context/command'
import { SerializationContext } from '../base'


export default (copy: Copy, context: SerializationContext) => ({
  copy: context.serializeExpr(copy.src, context),
  to: context.serializeExpr(copy.dest, context),
})
