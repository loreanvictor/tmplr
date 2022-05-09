import { Context } from '../context'
import { Command, Expr } from '../context/command'


export interface ParsingContext extends Context {
  parseCommand(context: ParsingContext, obj: any): Command
  parseExpr(context: ParsingContext, obj: any): Expr
}
