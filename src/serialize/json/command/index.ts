import { Command, Copy, Degit, Read, Remove, Run, Steps, Update } from '../../../context/command'
import { SerializationContext } from '../base'

import serializeCopy from './copy'
import serializeUpdate from './update'
import serializeRead from './read'
import serializeRemove from './remove'
import serializeSteps from './steps'
import serializeDegit from './degit'
import serializeRun from './run'


export default (command: Command, context: SerializationContext) => {
  if (command instanceof Update) {
    return serializeUpdate(command, context)
  } else if (command instanceof Copy) {
    return serializeCopy(command, context)
  } else if (command instanceof Remove) {
    return serializeRemove(command, context)
  } else if (command instanceof Steps) {
    return serializeSteps(command, context)
  } else if (command instanceof Read) {
    return serializeRead(command, context)
  } else if (command instanceof Degit) {
    return serializeDegit(command, context)
  } else if (command instanceof Run) {
    return serializeRun(command, context)
  }

  throw new Error(`Unsupported command: ${command.constructor.name}`)
}
