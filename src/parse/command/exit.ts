import { Exit } from '../../context/command'
import { ParsingContext } from '../../context'


export function parseExit(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('Expected object.')
  }

  if (!obj.exit) {
    throw new Error('Expected "exit" field.')
  }

  return new Exit(
    context.parseExpr(context, obj.exit),
  )
}
