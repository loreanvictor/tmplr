import { readFile, writeFile } from 'fs/promises'

import { evaluate } from '../eval'
import { Expr } from '../expr'
import { Store } from '../store'
import { Change, ChangeLog } from './change'
import { checkFile } from './util/check-file'


export class Update extends Change {
  constructor(
    readonly target: Expr,
    readonly store: Store,
    root: string,
    log: ChangeLog,
  ) { super(root, log) }

  protected async commit() {
    const target = this.path(await this.delegate(this.target, s => s.eval()))

    await checkFile(target)

    const content = await readFile(target, 'utf8')
    const updated = await evaluate(this.store, content)
    await writeFile(target, updated)

    return { target }
  }
}
