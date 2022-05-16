import { readFile } from 'fs/promises'
import { dirname } from 'path'
import { parse } from 'yaml'

import { ParsingContext } from '../../parse/base'
import { Provider } from '../provider/base'
import { createLazyProvider } from '../provider/lazy'
import { createTmpDirProvider } from '../provider/tmpdir'
import { Expr } from '../expr/base'
import { Scope } from '../scope'

import { Rooted } from './rooted'
import { checkFile } from './util/check-file'
import { Command } from './base'


export async function runYaml(
  src: string,
  args: Provider,
  outputs: {[name: string]: string},
  context: ParsingContext,
  delegate: (command: Command) => Promise<void>,
  scope: Scope,
  root?: string,
) {
  const contents = await readFile(src, 'utf8')
  const parsed = parse(contents)

  const ctx = {
    ...context,
    root: root || dirname(src),
    stack: context.stack.sub({
      args,
      tmpdir: createTmpDirProvider(),
    }),
  }
  const command = context.parseCommand(ctx, parsed)

  try {
    await delegate(command)
  } finally {
    await ctx.stack.cleanup()
  }

  for (const [name, outname] of Object.entries(outputs)) {
    if (ctx.stack.has(outname)) {
      scope.set(name, await ctx.stack.get(outname))
    } else {
      throw new Error('Output not found: ' + outname)
    }
  }
}


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

    await runYaml(
      src,
      createLazyProvider(this.inputs),
      this.outputs,
      this.context,
      async (command) => this.delegate(command, c => c.run()),
      this.scope,
    )
  }
}
