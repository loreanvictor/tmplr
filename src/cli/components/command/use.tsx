import React from 'react'

import { Use } from '../../../context/command'
import { useRunnableState } from '../hooks'
import { Waiting, Success } from '../theme'


export interface UseInfoProps {
  use: Use
}


export function UseInfo({ use }: UseInfoProps) {
  const running = useRunnableState(use)

  return running ?
    <Waiting>Fetching and executing script ...</Waiting> :
    <Success>Fetched & Executed!</Success>
}
