import degit from 'degit'

import { Expr } from '../expr'
import { Change, ChangeLog } from './change'
import { checkSubPath } from './util/sub-path'


export class Degit extends Change {
  constructor(
    readonly src: Expr,
    readonly dest: Expr | undefined,
    log: ChangeLog,
  ) { super(log) }

  protected async commit() {
    const src = await this.delegate(this.src, s => s.eval())
    const dest = this.dest ? await this.delegate(this.dest, s => s.eval()): '.'

    await checkSubPath(dest)

    const emitter = degit(src, {
      cache: true,
      force: true,
    })

    await emitter.clone(dest)

    return { src, dest }
  }
}
