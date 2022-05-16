import { Use } from '../../context/command'
import { ParsingContext } from '../base'


export function parseUse(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (!obj.use) {
    throw new Error('Expected "use" field.')
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

  return new Use(
    context.parseExpr(context, obj.use),
    inputs,
    outputs,
    context,
    context.stack,
  )
}
