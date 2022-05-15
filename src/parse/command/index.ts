import { ParsingContext } from '../base'
import { parseCopy } from './copy'
import { parseRead } from './read'
import { parseRemove } from './remove'
import { parseSteps } from './steps'
import { parseUpdate } from './update'
import { parseDegit } from './degit'


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
  } else if (obj.degit) {
    return parseDegit(context, obj)
  }

  throw new Error('Expected "steps", "read", "update", "copy", or "remove".')
}
