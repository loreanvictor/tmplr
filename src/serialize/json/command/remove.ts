import { Remove } from '../../../context/command'
import { SerializationContext } from '../base'


export default (remove: Remove, _: SerializationContext) => ({
  remove: remove.target,
})
