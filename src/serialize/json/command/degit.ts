import { Degit } from '../../../context/command'
import { SerializationContext } from '../../../context'


export default (degit: Degit, context: SerializationContext) => ({
  degit: context.serializeExpr(degit.src, context),
  to: degit.dest ? context.serializeExpr(degit.dest, context) : undefined,
})
