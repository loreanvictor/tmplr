import { Value } from '../../../context/command'
import { SerializationContext } from '../base'


export default (value: Value, _: SerializationContext) => (value.value)
