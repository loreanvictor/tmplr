import { Steps } from '../../../context/command'
import { SerializationContext } from '../../../context'


export default (steps: Steps, context: SerializationContext) => ({
  steps: steps.steps.map(step => context.serializeCommand(step, context)),
})
