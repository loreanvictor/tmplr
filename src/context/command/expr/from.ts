import { Store } from '../../store'
import { Expr } from './base'


export class From extends Expr {
  constructor(
    readonly store: Store,
    readonly address: string,
    readonly fallback?: Expr,
  ) { super() }

  protected async _eval() {
    if (this.store.has(this.address)) {
      return await this.store.get(this.address)
    } else {
      if (this.fallback) {
        return await this.delegate(this.fallback, f => f.eval())
      } else {
        return ''
      }
    }
  }
}
