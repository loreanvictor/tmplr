import { indent } from '../util/indent'
import { Expr } from './base'


export class Value extends Expr {
  constructor(readonly value: string) { super() }
  protected async _eval() { return this.value }
  summary(i) { return indent(this.value, i) }
}
