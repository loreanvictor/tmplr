import { join, isAbsolute } from 'path'

import { evaluate } from '../eval'
import { Store } from '../store'
import { Expr } from './base'


export class Path extends Expr {
  constructor(
    readonly expr: string,
    readonly store: Store,
    readonly root: string,
  ) { super() }

  protected async _eval() {
    const path = await evaluate(this.store, this.expr)

    return isAbsolute(path) ? path : join(this.root, path)
  }
}
