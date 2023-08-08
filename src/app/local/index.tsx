import React from 'react'
import { useAsync } from 'react-use'
import { access } from 'fs/promises'

import { COMPONENTS } from '../../components'
import { Waiting  } from '../../theme'
import { runLocalRecipe } from '../../recipes'
import { createRuntime } from '../runtime'
import { Exec } from '../exec'


function useLocalEnv(workdir: string) {
  const {value, loading, error} = useAsync(async () => {
    await access(workdir)

    return await createRuntime(workdir, async () => runLocalRecipe())
  }, [workdir])

  return { runtime: value, loading, error }
}


export interface RunLocalProps {
  workdir: string
}


export function RunLocal({ workdir }: RunLocalProps) {
  const { runtime, loading, error } = useLocalEnv(workdir)

  return <>
    { loading && <Waiting>Checking working directory ...</Waiting> }
    { error && <COMPONENTS.Error error={error} message={error.message} /> }
    { !!runtime && <Exec runtime={runtime} /> }
  </>
}
