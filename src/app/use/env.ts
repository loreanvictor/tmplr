import { useAsync } from 'react-use'
import { join } from 'path'
import { access, mkdir, cp } from 'fs/promises'

import { createRuntime } from '../exec'
import { useRecipe, runAndClean } from '../../recipes'


export function useUseEnv(workdir: string, target: string) {
  const {value, loading, error} = useAsync(async () => {
    const local = target.startsWith('local:')

    if (local) {
      const path = local ? target.slice(6) : target
      const dirname = '.use-' + Math.random().toString(36).slice(2)
      const recipedir = join(workdir, dirname)

      await mkdir(recipedir, { recursive: true })
      await cp(path, recipedir, { recursive: true })

      return await createRuntime(workdir, async () => runAndClean(join(dirname, '.tmplr.yml')))
    } else {
      await access(workdir)

      return await createRuntime(workdir, async () => useRecipe(target))
    }
  }, [workdir, target])

  return { runtime: value, loading, error }
}
