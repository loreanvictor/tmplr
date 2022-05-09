import { ParsingContext } from '../base'
import { parseCopy } from '../command/copy'
import { parseRead } from '../command/read'
import { parseRemove } from '../command/remove'
import { parseSteps } from '../command/steps'
import { parseUpdate } from '../command/update'


export function parseCommand(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (obj.read) {
    return parseRead(context, obj)
  } else if (obj.update) {
    return parseUpdate(context, obj)
  } else if (obj.copy) {
    return parseCopy(context, obj)
  } else if (obj.remove) {
    return parseRemove(context, obj)
  } else if (obj.steps) {
    return parseSteps(context, obj)
  }

  throw new Error('Expected "steps", "read", "update", "copy", or "remove".')
}
