import React from 'react'
import { ExecutionInterface } from '@tmplr/react'

import { COMPONENTS } from '../../components'
import { ExecArgs } from './types'
import { Waiting } from '../../theme'
import { useRuntime } from './runtime'
import { WorkDirAware } from '../../util'


export function Exec(args: ExecArgs) {
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
