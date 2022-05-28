import degit from 'degit'
import { join } from 'path'
import { mkdtemp, rm } from 'fs/promises'

import { Expr } from '../expr/base'
import { ParsingContext } from '../base'
import { Scope } from '../scope'
import { checkFile } from './util/check-file'
import { Command } from './base'
import { runYaml } from './run'
import { createLazyProvider } from '../provider/lazy'


export class Use extends Command {
  constructor(
    readonly target: Expr,
    readonly inputs: {[name: string]: Expr},
    readonly outputs: {[name: string]: string},
    readonly context: ParsingContext,
    readonly scope: Scope,
  ) { super() }

  protected async _run() {
    const target = await this.delegate(this.target, e => e.eval())
    const tmpdir = await mkdtemp('.imported-')

    try {
      const emitter = degit(target, {
        cache: false,
        force: true,
      })

      await emitter.clone(tmpdir)

      const file = join(tmpdir, '.tmplr.yml')
      await checkFile(file)

      await runYaml(
        file,
        createLazyProvider(this.inputs),
        this.outputs,
        this.context,
        cmd => this.delegate(cmd, c => c.run()),
        this.scope,
      )
    } finally {
      await rm(tmpdir, { recursive: true })
    }
  }
}
