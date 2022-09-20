import React from 'react'
import { ExecutionInterface } from '@tmplr/react'

import { COMPONENTS } from './components'
import { RepoArgs } from './args'
import { Waiting } from './theme'
import { useRuntime } from './runtime'
import { WorkDirAware } from './workdir'


export function Exec(args: RepoArgs) {
  const { loading, runtime, error } = useRuntime(args)

  return <>
    { loading && <Waiting>Initializing ...</Waiting> }
    { error && <COMPONENTS.Error error={error} message={error.message} /> }
    { !!runtime &&
      <WorkDirAware workdir={runtime.parser.filesystem.root}>
        <ExecutionInterface
          execution={runtime.execution!}
          changeLog={runtime.changeLog!}
          components={COMPONENTS}
        />
      </WorkDirAware>
    }
  </>
}
