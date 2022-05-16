import { Value } from '../../../context/expr'
import { SerializationContext } from '../base'


export default (value: Value, _: SerializationContext) => (value.value)
