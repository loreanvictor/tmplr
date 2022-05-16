import { Command } from '../../context/command/base'
import { Expr } from '../../context/expr/base'


export interface SerializationContext {
  serializeCommand(command: Command, context: SerializationContext): any
  serializeExpr(expr: Expr, context: SerializationContext): any
}
