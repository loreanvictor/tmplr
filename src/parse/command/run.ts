import { Run } from '../../context/command'
import { ParsingContext } from '../../context'


export function parseRun(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (!obj.run) {
    throw new Error('Expected "run" field.')
  }

  const inputs = {}
  if (obj.with) {
    obj.with.forEach(entry => {
      if (typeof entry === 'string') {
        inputs[entry] = context.parseExpr(context, { eval: `{{ ${entry} }}` })
      } else {
        const key = Object.keys(entry)[0]
        const expr = context.parseExpr(context, entry[key!])

        inputs[key!] = expr
      }
    })
  }

  const outputs = {}
  if (obj.read) {
    obj.read.forEach(entry => {
      if (typeof entry === 'string') {
        outputs[entry] = entry
      } else {
        const key = Object.keys(entry)[0]
        outputs[key!] = entry[key!]
      }
    })
  }

  return new Run(
    context.parseExpr(context, obj.run),
    inputs,
    outputs,
    context,
    context.stack,
    context.root,
  )
}
