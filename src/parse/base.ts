import { Context } from '../context/base'
import { Command } from '../context/command/base'
import { Expr } from '../context/expr/base'


export interface ParsingContext extends Context {
  parseCommand(context: ParsingContext, obj: any): Command
  parseExpr(context: ParsingContext, obj: any): Expr
  root: string
}
