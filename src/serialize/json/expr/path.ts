import { Path } from '../../../context/expr'
import { SerializationContext } from '../../../context'


export default (path: Path, _: SerializationContext) => ({
  path: path.expr,
})
