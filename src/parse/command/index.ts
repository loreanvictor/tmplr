import { ParsingContext } from '../base'
import { parseCopy } from './copy'
import { parseRead } from './read'
import { parseRemove } from './remove'
import { parseSteps } from './steps'
import { parseUpdate } from './update'
import { parseDegit } from './degit'
import { parseRun } from './run'
import { parseUse } from './use'
import { parseExit } from './exit'


export function parseCommand(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (obj.run) {
    return parseRun(context, obj)
  } else if (obj.use) {
    return parseUse(context, obj)
  } else if (obj.read) {
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
  } else if (obj.exit) {
    return parseExit(context, obj)
  }

  throw new Error('Expected "steps", "read", "update", "copy", or "remove".')
}
