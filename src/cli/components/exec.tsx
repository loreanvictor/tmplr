import React from 'react'
import { useAsync } from 'react-use'
import { ExecutionInterface } from '@tmplr/react'
import { scopeFromProviders, EvaluationContext, STANDARD_PIPES, ChangeLog } from '@tmplr/core'
import { createEnvProvider, createGitProvider, createTmpDirProvider, NodeFS } from '@tmplr/node'
import { Parser, STANDARD_RULE_SET } from '@tmplr/yaml-parser'

import { RepoArgs } from '../args'
import { Error, Success, Waiting } from './theme'


const setupParser = () => {
  // TODO: perhaps this should be an argument?
  const workdir = process.cwd()

  const scope = scopeFromProviders({
    env: createEnvProvider(),
    git: createGitProvider(workdir),
    tmpdir: createTmpDirProvider(workdir),
  }, 'tmplr')

  const fs = new NodeFS(workdir)
  const context = new EvaluationContext(scope, STANDARD_PIPES)
  const log = new ChangeLog()

  return new Parser(STANDARD_RULE_SET, scope, context, fs, log)
}


export function Exec(_: RepoArgs) {
  const env = useAsync(async () => {
    const parser = setupParser()
    // TODO: if repo is passed, should instead degit and tmplr that repo
    const runnable = await parser.parse('.tmplr.yml')
    const changeLog = parser.changelog
    const execution = runnable.run()

    return {
      execution,
      changeLog,
      runnable,
      parser,
    }
  })

  return <>
    { env.loading && <Waiting>Initializing ...</Waiting> }
    { env.value &&
      <ExecutionInterface
        execution={env.value.execution}
        changeLog={env.value.changeLog}
        components={{
          Logger: () => <Success>DONE!</Success>,
          Error: () => <Error>ERROR!</Error>,
          Waiting: () => <Waiting>Working ...</Waiting>,
          route: () => undefined,
        }}
      />
    }
  </>
}
