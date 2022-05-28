import { Eval } from '../../../context/expr'
import { SerializationContext } from '../../../context'


export default (_eval: Eval, context: SerializationContext) => ({
  eval: _eval.expr,
  ...(_eval.steps ? context.serializeCommand(_eval.steps, context) : {})
})
