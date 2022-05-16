import { Path } from '../../../context/expr'
import { SerializationContext } from '../base'


export default (path: Path, _: SerializationContext) => ({
  path: path.expr,
})
