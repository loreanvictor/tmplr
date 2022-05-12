import React from 'react'

import { Remove } from '../../context/command'
import { useRunnableState } from '../hooks'
import { Waiting, Success } from '../theme'


export interface RemoveInfoProps {
  remove: Remove
}


export function RemoveInfo({ remove }: RemoveInfoProps) {
  const running = useRunnableState(remove)

  return running ?
    <Waiting>Removing {remove.target} ...</Waiting> :
    <Success>Removed {remove.target}</Success>
}
