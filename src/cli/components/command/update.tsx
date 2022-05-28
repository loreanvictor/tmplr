import React from 'react'

import { Update } from '../../../context/command'
import { useRunnableState } from '../hooks'
import { Waiting, Success } from '../theme'


export interface UpdateInfoProps {
  update: Update
}


export function UpdateInfo({ update }: UpdateInfoProps) {
  const running = useRunnableState(update)

  return running ?
    <Waiting>Updating files...</Waiting> :
    <Success>Updated!</Success>
}
