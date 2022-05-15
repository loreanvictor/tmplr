import { Runnable } from '../../context'
import { Command } from '../../context/command'
import { Expr } from '../../context/expr'
import serializeCommand from './command'
import serializeExpr from './expr'


export default (runnable: Runnable) => {
  const context = { serializeCommand, serializeExpr }

  if (runnable instanceof Command) {
    return serializeCommand(runnable, context)
  } else if (runnable instanceof Expr) {
    return serializeExpr(runnable, context)
  }

  throw new Error(`Unsupported runnable: ${runnable.constructor.name}`)
}
