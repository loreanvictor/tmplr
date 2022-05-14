import { Store } from '../store'
import { ChangeLog } from './change'
import { Copy } from './copy'
import { indent } from './util/indent'


export class Update extends Copy {
  constructor(
    readonly target: string,
    store: Store,
    log: ChangeLog,
  ) { super(target, target, store, log) }

  override summary(i) {
    return indent(`update: ${this.target}`, i)
  }
}
