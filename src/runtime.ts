import { useAsync } from 'react-use'
import { ChangeLog, EvaluationContext, scopeFromProviders, STANDARD_PIPES } from '@tmplr/core'
import { createEnvProvider, createGitProvider, createTmpDirProvider, NodeFS } from '@tmplr/node'
import { STANDARD_RULE_SET, Parser } from '@tmplr/yaml-parser'

import { RepoArgs } from './args'


const setupParser = () => {
  // TODO: perhaps this should be an argument?
  const workdir = process.cwd()
  const fs = new NodeFS(workdir)

  const scope = scopeFromProviders({
    env: createEnvProvider(),
    git: createGitProvider(workdir),
    tmpdir: createTmpDirProvider(workdir),
  }, 'tmplr')

  const context = new EvaluationContext(scope, STANDARD_PIPES)
  const log = new ChangeLog()

  return new Parser(STANDARD_RULE_SET, scope, context, fs, log)
}


export function useRuntime(_: RepoArgs) {
  const env = useAsync(async () => {
    const parser = setupParser()
    // TODO: if repo is passed, should instead degit and tmplr that repo
    const runnable = await parser.parseString('run: .tmplr.yml')
    const changeLog = parser.changelog
    const execution = runnable.run()

    return {
      execution,
      changeLog,
      runnable,
      parser,
    }
  })

  return {
    loading: env.loading,
    runtime: env.value,
  }
}
