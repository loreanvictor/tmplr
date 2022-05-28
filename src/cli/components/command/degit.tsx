import React from 'react'

import { Degit } from '../../../context/command'
import { useRunnableState } from '../hooks'
import { Waiting, Success } from '../theme'


export interface DegitInfoProps {
  degit: Degit
}


export function DegitInfo({ degit }: DegitInfoProps) {
  const running = useRunnableState(degit)

  return running ?
    <Waiting>Cloning...</Waiting> :
    <Success>Cloned!</Success>
}
