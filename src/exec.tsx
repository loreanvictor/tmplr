import React from 'react'
import { ExecutionInterface } from '@tmplr/react'

import { COMPONENTS } from './components'
import { RepoArgs } from './args'
import { Waiting } from './theme'
import { useRuntime } from './runtime'


export function Exec(_: RepoArgs) {
  const { loading, runtime } = useRuntime(_)

  return <>
    { loading && <Waiting>Initializing ...</Waiting> }
    { runtime &&
      <ExecutionInterface
        execution={runtime.execution}
        changeLog={runtime.changeLog}
        components={COMPONENTS}
      />
    }
  </>
}
