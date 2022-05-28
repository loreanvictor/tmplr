import { Stack, NULL_STACK } from './stack'
import { ChangeLog, Command, NULL_LOG } from './command'
import { Expr } from './expr'


export interface Context {
  stack: Stack
  changeLog: ChangeLog
}


export const NULL_CONTEXT = {
  stack: NULL_STACK,
  changeLog: NULL_LOG,
}


export interface SerializationContext {
  serializeCommand(command: Command, context: SerializationContext): any
  serializeExpr(expr: Expr, context: SerializationContext): any
}


export interface ParsingContext extends Context {
  parseCommand(context: ParsingContext, obj: any): Command
  parseExpr(context: ParsingContext, obj: any): Expr
  root: string
}
