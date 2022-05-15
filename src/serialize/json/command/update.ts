import { Update } from '../../../context/command'
import { SerializationContext } from '../base'


export default (update: Update, _: SerializationContext) => ({
  update: update.target,
})
