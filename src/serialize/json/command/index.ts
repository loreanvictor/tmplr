import { Command, Copy, Degit, Exit, Read, Remove, Run, Steps, Update, Use } from '../../../context/command'
import { SerializationContext } from '../../../context'

import serializeCopy from './copy'
import serializeUpdate from './update'
import serializeRead from './read'
import serializeRemove from './remove'
import serializeSteps from './steps'
import serializeDegit from './degit'
import serializeRun from './run'
import serializeUse from './use'
import serializeExit from './exit'


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
  } else if (command instanceof Use) {
    return serializeUse(command, context)
  } else if (command instanceof Exit) {
    return serializeExit(command, context)
  }

  throw new Error(`Unsupported command: ${command.constructor.name}`)
}
