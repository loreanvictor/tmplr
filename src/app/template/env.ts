import { useAsync } from 'react-use'
import { mkdir } from 'fs/promises'

import { createRuntime } from '../runtime'
import { degitAndRun } from '../../recipes'


export interface TemplateEnvExtras {
  subgroup?: boolean
  skipWarnings?: boolean
}


export function useTemplateEnv(workdir: string, target: string, extras: TemplateEnvExtras = {}) {
  const { value, loading, error } = useAsync(async () => {
    await mkdir(workdir, { recursive: true })

    return createRuntime(
      workdir,
      async () => degitAndRun(target, {
        subgroup: extras.subgroup,
        warnOnNoRecipe: !extras.skipWarnings,
      })
    )
  })

  return { runtime: value, loading, error }
}
