import { readFile } from 'fs/promises'
import { dirname } from 'path'
import { parse } from 'yaml'

import { Expr } from '../expr'
import { Command } from './base'
import { Rooted } from './rooted'
import { checkFile } from './util/check-file'


export class Run extends Rooted {
  constructor(
    readonly src: Expr,
    readonly parser: (_: string, __: string) => Command,
    root: string,
  ) { super(root) }

  async _run() {
    const src = this.path(await this.src.eval())
    await checkFile(src)

    const contents = await readFile(src, 'utf8')
    const parsed = parse(contents)
    const command = this.parser(parsed, dirname(src))

    await this.delegate(command, c => c.run())
  }
}
