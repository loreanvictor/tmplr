import { Store } from '../store'
import { ChangeLog } from './change'
import { Copy } from './copy'


export class Update extends Copy {
  constructor(
    readonly target: string,
    store: Store,
    log: ChangeLog,
  ) { super(target, target, store, log) }

  override summary() {
    return `update: ${this.target}`
  }
}
