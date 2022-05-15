import { rm } from 'fs/promises'

import { checkFile } from './util/check-file'
import { ChangeLog, Change } from './change'
import { Expr } from '../expr'


export class Remove extends Change {
  constructor(
    readonly target: Expr,
    log: ChangeLog,
  ) { super(log) }

  protected async commit() {
    const target = await this.delegate(this.target, s => s.eval())

    await checkFile(target)
    await rm(target)

    return { target }
  }
}
