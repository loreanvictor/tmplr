import { Copy } from '../../../context/command'
import { SerializationContext } from '../base'


export default (copy: Copy, _: SerializationContext) => ({
  copy: copy.src,
  to: copy.dest,
})
