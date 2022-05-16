import { Use } from '../../../context/command'
import { SerializationContext } from '../base'


export default (use: Use, context: SerializationContext) => ({
  run: context.serializeExpr(use.target, context),
  ...(
    Object.keys(use.inputs).length > 0 ?
      {
        with: Object.entries(use.inputs)
          .map(
            ([name, expr]) => ({
              [name]: context.serializeExpr(expr, context),
            })
          ),
      } :
      {}
  ),
  ...(
    Object.keys(use.outputs).length > 0 ?
      {
        read: Object.entries(use.outputs)
          .map(([name, outname]) => name === outname ? name : { [name]: outname }),
      } :
      {}
  ),
})
