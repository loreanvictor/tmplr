import React from 'react'

import { Waiting } from '../../theme'
import { COMPONENTS } from '../../components'
import { Exec } from '../exec'
import { TemplateEnvExtras, useTemplateEnv } from './env'


export interface TemplateProps extends TemplateEnvExtras {
  workdir: string
  target: string
}


export function Template({ workdir, target, subgroup, skipWarnings }: TemplateProps)  {
  const { runtime, loading, error } = useTemplateEnv(workdir, target, {
    subgroup,
    skipWarnings,
  })

  return <>
    { loading && <Waiting>Initializing ...</Waiting> }
    { error && <COMPONENTS.Error error={error} message={error.message} /> }
    { !!runtime && <Exec runtime={runtime} /> }
  </>
}
