import { unlink } from 'fs/promises'

import { ChangeLog, Change } from './change'


export class Remove extends Change {
  constructor(
    readonly target: string,
    log: ChangeLog,
  ) { super(log) }

  protected async commit() {
    await unlink(this.target)
  }
}
