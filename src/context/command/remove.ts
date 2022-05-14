import { rm } from 'fs/promises'

import { checkFile } from './util/check-file'
import { ChangeLog, Change } from './change'


export class Remove extends Change {
  constructor(
    readonly target: string,
    log: ChangeLog,
  ) { super(log) }

  protected async commit() {
    await checkFile(this.target)
    await rm(this.target)
  }

  summary() {
    return `remove: ${this.target}`
  }
}
