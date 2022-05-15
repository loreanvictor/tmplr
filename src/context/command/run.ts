import { readFile } from 'fs/promises'
import { parse } from 'yaml'

import { Expr } from '../expr'
import { Command } from './base'
import { checkFile } from './util/check-file'


export class Run extends Command {
  constructor(
    readonly src: Expr,
    readonly parser: (_: string) => Promise<Command>
  ) { super() }

  async _run() {
    const src = await this.src.eval()
    await checkFile(src)

    const contents = await readFile(src, 'utf8')
    const parsed = parse(contents)
    const command = await this.parser(parsed)

    await this.delegate(command, c => c.run())
  }
}
