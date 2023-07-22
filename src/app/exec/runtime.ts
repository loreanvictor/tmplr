import { useAsync } from 'react-use'
import { mkdir, access, cp } from 'fs/promises'
import { ChangeLog, EvaluationContext, scopeFromProviders, STANDARD_PIPES } from '@tmplr/core'
import { createEnvProvider, createGitProvider, createTmpDirProvider, NodeFS } from '@tmplr/node'
import { STANDARD_RULE_SET, Parser } from '@tmplr/yaml-parser'

import { ExecArgs, isLocalTemplateArgs, isRemoteTemplateArgs } from './types'
import { degitAndRun } from '../../recipes/degit-and-run'
import { runLocalRecipe } from '../../recipes/run-local'


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


export function useRuntime(args: ExecArgs) {
  const env = useAsync(async () => {
    if (isRemoteTemplateArgs(args)) {
      await mkdir(args.workdir, { recursive: true })
    } else if (isLocalTemplateArgs(args)) {
      await mkdir(args.workdir, { recursive: true })
      await cp(args.path, args.workdir, { recursive: true })
    } else {
      await access(args.workdir)
    }

    const parser = setupParser(args.workdir)
    const recipe = isRemoteTemplateArgs(args) ?
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
  }, [args])

  return {
    loading: env.loading,
    runtime: env.value,
    error: env.error,
  }
}
