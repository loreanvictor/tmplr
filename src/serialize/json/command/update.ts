import { Update } from '../../../context/command'
import { SerializationContext } from '../base'


export default (update: Update, context: SerializationContext) => ({
  update: context.serializeExpr(update.target, context),
})
