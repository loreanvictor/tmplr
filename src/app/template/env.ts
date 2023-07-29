import { useAsync } from 'react-use'
import { cp, mkdir } from 'fs/promises'

import { createRuntime } from '../exec'
import { degitAndRun, runLocalRecipe } from '../../recipes'


export function useTemplateEnv(workdir: string, target: string) {
  const { value, loading, error } = useAsync(async () => {
    const local = target.startsWith('local:')
    const path = local ? target.slice(6) : target

    await mkdir(workdir, { recursive: true })
    if (local) {
      await cp(path, workdir, { recursive: true })
    }

    return createRuntime(
      workdir,
      async (root) => {
        return local ? runLocalRecipe() : degitAndRun(target, root)
      }
    )
  })

  return { runtime: value, loading, error }
}
