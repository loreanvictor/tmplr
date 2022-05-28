import React from 'react'

import { Run } from '../../../context/command'
import { useRunnableState } from '../hooks'
import { Waiting, Success } from '../theme'


export interface RunInfoProps {
  run: Run
}


export function RunInfo({ run }: RunInfoProps) {
  const running = useRunnableState(run)

  return running ?
    <Waiting>Parsing and executing script ...</Waiting> :
    <Success>Executed!</Success>
}
