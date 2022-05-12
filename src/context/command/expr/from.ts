import { Store } from '../../store'
import { Expr } from './base'


export class From extends Expr {
  constructor(
    readonly store: Store,
    readonly address: string,
    readonly fallback?: Expr,
  ) { super() }

  protected async _eval() {
    const val = this.store.has(this.address) ? await this.store.get(this.address) : undefined

    if (val && val.trim().length > 0) {
      return val
    } else {
      if (this.fallback) {
        return await this.delegate(this.fallback, f => f.eval())
      } else {
        return ''
      }
    }
  }
}
