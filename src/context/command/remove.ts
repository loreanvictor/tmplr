import { rm } from 'fs/promises'

import { checkFile } from './util/check-file'
import { ChangeLog, Change } from './change'
import { indent } from './util/indent'


export class Remove extends Change {
  constructor(
    readonly target: string,
    log: ChangeLog,
  ) { super(log) }

  protected async commit() {
    await checkFile(this.target)
    await rm(this.target)
  }

  summary(i) {
    return indent(`remove: ${this.target}`, i)
  }
}
