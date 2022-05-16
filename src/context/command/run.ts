import { readFile } from 'fs/promises'
import { dirname } from 'path'
import { parse } from 'yaml'

import { ParsingContext } from '../../parse/base'
import { createLazyProvider } from '../provider/lazy'
import { createTmpDirProvider } from '../provider/tmpdir'
import { Expr } from '../expr/base'
import { Scope } from '../scope'

import { Rooted } from './rooted'
import { checkFile } from './util/check-file'


export class Run extends Rooted {
  constructor(
    readonly src: Expr,
    readonly inputs: {[name: string]: Expr},
    readonly outputs: {[name: string]: string},
    readonly context: ParsingContext,
    readonly scope: Scope,
    root: string,
  ) { super(root) }

  async _run() {
    const src = this.path(await this.src.eval())
    await checkFile(src)

    const contents = await readFile(src, 'utf8')
    const parsed = parse(contents)

    const context = {
      ...this.context,
      root: dirname(src),
      stack: this.context.stack.sub({
        args: createLazyProvider(this.inputs),
        tmpdir: createTmpDirProvider(),
      }),
    }
    const command = this.context.parseCommand(context, parsed)

    try {
      await this.delegate(command, c => c.run())
    } finally {
      await context.stack.cleanup()
    }

    for (const [name, outname] of Object.entries(this.outputs)) {
      if (context.stack.has(outname)) {
        this.scope.set(name, await context.stack.get(outname))
      } else {
        throw new Error('Output not found: ' + outname)
      }
    }
  }
}
