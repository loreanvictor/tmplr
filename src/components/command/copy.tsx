import React from 'react'

import { Copy } from '../../context/command'
import { useRunnableState } from '../hooks'
import { Waiting, Success } from '../theme'


export interface CopyInfoProps {
  copy: Copy
}


export function CopyInfo({ copy }: CopyInfoProps) {
  const running = useRunnableState(copy)

  return running ?
    <Waiting>Copying {copy.src} to {copy.dest} ...</Waiting> :
    <Success>Copied {copy.src} to {copy.dest}</Success>
}
