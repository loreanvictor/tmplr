import React from 'react'
import { ExecutionInterface } from '@tmplr/react'

import { COMPONENTS } from '../components'
import { Runtime } from './runtime'
import { WorkDirAware } from '../util'


export interface ExecProps<T> {
  runtime: Runtime<T>
}


export function Exec({ runtime }: ExecProps<unknown>) {
  return <>
    <WorkDirAware workdir={runtime.parser.filesystem.root}>
      <ExecutionInterface
        execution={runtime.execution}
        changeLog={runtime.changelog}
        components={COMPONENTS}
      />
    </WorkDirAware>
  </>
}
