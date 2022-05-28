import { Value } from '../../../context/expr'
import { SerializationContext } from '../../../context'


export default (value: Value, _: SerializationContext) => (value.value)
