import { useAsync } from 'react-use'
import { mkdir, access } from 'fs/promises'
import { ChangeLog, EvaluationContext, scopeFromProviders, STANDARD_PIPES } from '@tmplr/core'
import { createEnvProvider, createGitProvider, createTmpDirProvider, NodeFS } from '@tmplr/node'
import { STANDARD_RULE_SET, Parser } from '@tmplr/yaml-parser'

import { RepoArgs } from './args'
import { degitAndRun } from './recipes/degit-and-run'
import { runLocalRecipe } from './recipes/run-local'


const setupParser = (workdir: string) => {
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


export function useRuntime(args: RepoArgs) {
  const env = useAsync(async () => {
    if (args.repo) {
      await mkdir(args.workdir, { recursive: true })
    } else {
      await access(args.workdir)
    }

    const parser = setupParser(args.workdir)
    const recipe = args.repo ?
      await degitAndRun(args.repo, parser.filesystem.root) :
      await runLocalRecipe()

    const runnable = await parser.parseString(recipe)
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
    error: env.error,
  }
}
