import { readFile, writeFile } from 'fs/promises'

import { evaluate } from '../eval'
import { Store } from '../store'
import { Change, ChangeLog } from './change'


export class Copy extends Change {
  constructor(
    readonly src: string,
    readonly dest: string,
    readonly store: Store,
    log: ChangeLog,
  ) { super(log) }

  protected async commit() {
    const content = await readFile(this.src, 'utf8')
    const updated = await evaluate(this.store, content)
    await writeFile(this.dest, updated)
  }
}
