import { readFile, writeFile } from 'fs/promises'

import { evaluate } from '../eval'
import { Expr } from '../expr'
import { Store } from '../store'
import { Change, ChangeLog } from './change'
import { checkFile } from './util/check-file'
import { ensurePath } from './util/ensure-path'
import { checkSubPath } from './util/sub-path'


export class Copy extends Change {
  constructor(
    readonly src: Expr,
    readonly dest: Expr,
    readonly store: Store,
    root: string,
    log: ChangeLog,
  ) { super(root, log) }

  protected async commit() {
    const src = this.path(await this.delegate(this.src, s => s.eval()))
    const dest = this.path(await this.delegate(this.dest, s => s.eval()))

    await checkFile(src)
    await checkSubPath(dest)
    await ensurePath(dest)

    const content = await readFile(src, 'utf8')
    const updated = await evaluate(this.store, content)
    await writeFile(dest, updated)

    return { src, dest }
  }
}
