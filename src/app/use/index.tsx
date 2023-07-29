import React from 'react'

import { COMPONENTS } from '../../components'
import { Waiting  } from '../../theme'
import { Exec } from '../exec'
import { useUseEnv } from './env'


export interface UseProps {
  workdir: string
  target: string
}


export function Use({ workdir, target }: UseProps) {
  const { runtime, loading, error } = useUseEnv(workdir, target)

  return <>
    { loading && <Waiting>Initializing recipe ...</Waiting> }
    { error && <COMPONENTS.Error error={error} message={error.message} /> }
    { !!runtime && <Exec runtime={runtime} /> }
  </>
}
