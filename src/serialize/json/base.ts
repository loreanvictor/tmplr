import { Command, Expr } from '../../context/command'


export interface SerializationContext {
  serializeCommand(command: Command, context: SerializationContext): any
  serializeExpr(expr: Expr, context: SerializationContext): any
}
