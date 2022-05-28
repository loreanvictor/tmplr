import React from 'react'

import { Read } from '../../../context/command'
import { useRunnableState } from '../hooks'
import { Waiting, Success } from '../theme'


export interface ReadInfoProps {
  read: Read
}


export function ReadInfo({ read }: ReadInfoProps) {
  const running = useRunnableState(read)

  return running ?
    <Waiting>Resolving {read.variable} ...</Waiting> :
    <Success>Resolved {read.variable}</Success>
}
