import { Eval } from '../../context/expr'
import { Steps } from '../../context/command'
import { ParsingContext } from '../../context'


export function parseEval(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('expected object')
  }

  if (!obj.eval) {
    throw new Error('expected "eval" field')
  }

  const steps = obj.steps ?
    context.parseCommand(context, { steps: obj.steps }) as Steps:
    undefined

  return new Eval(
    context.stack,
    obj.eval,
    steps
  )
}
