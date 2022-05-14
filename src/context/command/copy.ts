import { readFile, writeFile } from 'fs/promises'

import { evaluate } from '../eval'
import { Store } from '../store'
import { Change, ChangeLog } from './change'
import { checkFile } from './util/check-file'
import { indent } from './util/indent'
import { checkSubPath } from './util/sub-path'


export class Copy extends Change {
  constructor(
    readonly src: string,
    readonly dest: string,
    readonly store: Store,
    log: ChangeLog,
  ) { super(log) }

  protected async commit() {
    await checkFile(this.src)
    await checkSubPath(this.dest)

    const content = await readFile(this.src, 'utf8')
    const updated = await evaluate(this.store, content)
    await writeFile(this.dest, updated)
  }

  summary(i) {
    return indent(`copy: ${this.src}\nto: ${this.dest}`, i)
  }
}
