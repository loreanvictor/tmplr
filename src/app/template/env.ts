import { useAsync } from 'react-use'
import { mkdir } from 'fs/promises'

import { createRuntime } from '../runtime'
import { degitAndRun } from '../../recipes'


export function useTemplateEnv(workdir: string, target: string) {
  const { value, loading, error } = useAsync(async () => {
    await mkdir(workdir, { recursive: true })

    return createRuntime(
      workdir,
      async () => degitAndRun(target)
    )
  })

  return { runtime: value, loading, error }
}
