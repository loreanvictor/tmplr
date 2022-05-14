import { Store } from '../../store'
import { indent } from '../util/indent'
import { Expr } from './base'


export class From extends Expr {
  constructor(
    readonly store: Store,
    readonly address: string,
    readonly fallback?: Expr,
  ) { super() }

  protected async _eval() {
    let val: string | undefined
    try {
      if (this.store.has(this.address)) {
        val = await this.store.get(this.address)
      }

      if (!val || val.trim().length === 0) {
        throw new Error(`Could not resolve ${this.address}`)
      }

      return val
    } catch(error) {
      if (this.fallback) {
        return await this.delegate(this.fallback, e => e.eval())
      } else {
        throw error
      }
    }
  }

  summary(i) {
    return indent(
      `from: ${this.address}` +
      (this.fallback ? `\nfallback:\n${this.fallback.summary(1)}` : '')
      , i
    )
  }
}
