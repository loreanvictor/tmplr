
import { useAsync } from 'react-use'
import { mkdir, readdir, rm, cp, lstat, copyFile, writeFile } from 'fs/promises'
import { basename, join } from 'path'

import { createRuntime } from '../exec'
import { runLocalRecipe } from '../../recipes'


export const PREVIEW_DIRNAME = '.tmplr-preview'


export function usePreviewEnv(workdir: string, use = false) {
  const { value, loading, error } = useAsync(async () => {
    // remove previous preview dir
    await rm(join(workdir, PREVIEW_DIRNAME), { recursive: true, force: true })

    //
    // figure out where to put previe content. if previewing a template,
    // everything goes into .tmplr-preview/<template-name>, where <template-name> is the name
    // of current working directory.
    // if previewing a reusable recipe, put it in a .use-<random> subdirectory instead.
    //
    const previewroot = join(workdir, PREVIEW_DIRNAME)
    const usedir = '.use-' + Math.random().toString(36).slice(2)
    const previewdir = join(previewroot, use ? usedir : basename(workdir))

    // figure out directories and files to copy
    const files = (await readdir(workdir)).map(file => join(workdir, file))

    // create a new preview dir
    await mkdir(previewdir, { recursive: true })

    // copy files to preview dir
    await Promise.all(files.map(async file => {
      const stat = await lstat(file)
      if (stat.isDirectory()) {
        await cp(file, join(previewdir, basename(file)), { recursive: true })
      } else {
        await copyFile(file, join(previewdir, basename(file)))
      }
    }))

    //
    // if previewing a reusable recipe, we should
    // generate a parent recipe to use it as well.
    //
    if (use) {
      await writeFile(
        join(previewroot, '.tmplr.yml'),
        `
steps:
  - run: ${usedir}/.tmplr.yml
  - remove: ${usedir}
  - remove: .tmplr.yml`,
        'utf8'
      )
    }

    return await createRuntime(
      use ? previewroot : previewdir,
      async () => runLocalRecipe()
    )
  }, [workdir, use])

  return { runtime: value, loading, error }
}
