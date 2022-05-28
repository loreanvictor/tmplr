import { Update } from '../../../context/command'
import { SerializationContext } from '../../../context'


export default (update: Update, context: SerializationContext) => ({
  update: context.serializeExpr(update.target, context),
})
