import { evaluate } from '../eval'
import { Store } from '../store'
import { Steps } from '../command/steps'
import { Expr } from './base'


export class Eval extends Expr {
  constructor(
    readonly store: Store,
    readonly expr: string,
    readonly steps?: Steps
  ) { super() }

  protected async _eval() {
    if (this.steps) {
      await this.delegate(this.steps, s => s.run())
    }

    return await evaluate(this.store, this.expr)
  }
}
