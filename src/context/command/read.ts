import { Scope } from '../scope'
import { Command } from './base'
import { Expr } from './expr'
import { indent } from './util/indent'


export class Read extends Command {
  constructor(
    readonly variable: string,
    readonly expr: Expr,
    readonly scope: Scope,
  ) {
    super()
  }

  protected async _run() {
    const val = await this.delegate(this.expr, e => e.eval())
    await this.scope.set(this.variable, val)
  }

  summary(i) {
    return indent(`read: ${this.variable} \n${this.expr.summary()}`, i)
  }
}
