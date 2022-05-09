import { Expr } from './base'


export class Value extends Expr {
  constructor(readonly value: string) { super() }
  protected async _eval() { return this.value }
}
