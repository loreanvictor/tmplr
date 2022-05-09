import { Steps } from '../../context/command'
import { ParsingContext } from '../base'


export function parseSteps(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (!obj.steps) {
    throw new Error('Expected "steps" field.')
  }

  if (!Array.isArray(obj.steps)) {
    throw new Error('Expected "steps" to be an array.')
  }

  return new Steps(
    obj.steps.map(step => context.parseCommand(context, step))
  )
}
