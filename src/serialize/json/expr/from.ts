import { From } from '../../../context/expr'
import { SerializationContext } from '../base'


export default (from: From, context: SerializationContext) => ({
  from: from.address,
  ...(from.fallback ? { fallback: context.serializeExpr(from.fallback, context) } : {})
})
