import { useAsync } from 'react-use'
import { access } from 'fs/promises'

import { createRuntime } from '../runtime'
import { useRecipe } from '../../recipes'


export function useUseEnv(workdir: string, target: string) {
  const {value, loading, error} = useAsync(async () => {
    await access(workdir)

    return await createRuntime(workdir, async () => useRecipe(target))
  }, [workdir, target])

  return { runtime: value, loading, error }
}
