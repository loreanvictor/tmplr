import { Run } from '../../../context/command'
import { SerializationContext } from '../base'


export default (run: Run, context: SerializationContext) => ({
  run: context.serializeExpr(run.src, context),
})
