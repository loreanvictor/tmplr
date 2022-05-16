import { Run } from '../../../context/command'
import { SerializationContext } from '../base'


export default (run: Run, context: SerializationContext) => ({
  run: context.serializeExpr(run.src, context),
  ...(
    Object.keys(run.inputs).length > 0 ?
      {
        with: Object.entries(run.inputs)
          .map(
            ([name, expr]) => ({
              [name]: context.serializeExpr(expr, context),
            })
          ),
      } :
      {}
  ),
  ...(
    Object.keys(run.outputs).length > 0 ?
      {
        read: Object.entries(run.outputs)
          .map(([name, outname]) => name === outname ? name : { [name]: outname }),
      } :
      {}
  ),
})
