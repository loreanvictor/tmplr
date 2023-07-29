import React from 'react'

import { Waiting } from '../../theme'
import { COMPONENTS } from '../../components'
import { Exec } from '../exec'
import { useTemplateEnv } from './env'


export interface TemplateProps {
  workdir: string
  target: string
}


export function Template({ workdir, target }: TemplateProps)  {
  const { runtime, loading, error } = useTemplateEnv(workdir, target)

  return <>
    { loading && <Waiting>Initializing ...</Waiting> }
    { error && <COMPONENTS.Error error={error} message={error.message} /> }
    { !!runtime && <Exec runtime={runtime} /> }
  </>
}
