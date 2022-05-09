import { Scope } from '../scope'
import { Command } from './base'
import { Expr } from './expr'


export class Read extends Command {
  constructor(
    readonly variable: string,
    readonly expr: Expr,
    readonly scope: Scope,
  ) {
    super()
  }

  protected async _run() {
    await this.scope.set(this.variable, await this.expr.eval())
  }
}
