import { ChangeLog, createFSProvider, EvaluationContext, Flow, scopeFromProviders, STANDARD_PIPES } from '@tmplr/core'
import { createEnvProvider, createGitProvider, createTmpDirProvider, NodeFS } from '@tmplr/node'
import { STANDARD_RULE_SET, Parser, LocatedExecution, LocatedRunnable } from '@tmplr/yaml-parser'

import { createDatetimeProvider, DATETIME_FORMAT_PIPES } from '../util'


export interface Runtime<T=unknown> {
  workdir: string
  execution: LocatedExecution<T>
  runnable: LocatedRunnable<T>
  changelog: ChangeLog
  parser: Parser
}



const setupParser = (workdir: string) => {
  const fs = new NodeFS(workdir)

  const scope = scopeFromProviders({
    env: createEnvProvider(),
    git: createGitProvider(workdir),
    tmpdir: createTmpDirProvider(workdir),
    datetime: createDatetimeProvider(),
    filesystem: createFSProvider(fs),
  }, 'tmplr')

  const context = new EvaluationContext(scope, {
    ...STANDARD_PIPES,
    ...DATETIME_FORMAT_PIPES
  })
  const log = new ChangeLog()

  return new Parser(STANDARD_RULE_SET, scope, context, fs, log)
}


export async function createRuntime(
  workdir: string,
  recipeFn: (root: string) => Promise<string>,
): Promise<Runtime<unknown>> {
  const parser = setupParser(workdir)
  const recipe = await recipeFn(parser.filesystem.root)

  const runnable = await parser.parseString(recipe)
  const changelog = parser.changelog!

  // TODO: the proper flow environment should be provided by @tmplr/node
  const execution = runnable.run(new Flow({onKill: () => () => {}}))
  
  return {
    workdir,
    execution,
    changelog,
    runnable,
    parser,
  }
}
