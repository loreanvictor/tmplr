import React from 'react'
import { useAsync } from 'react-use'
import { Newline } from 'ink'

import { basename, join, relative } from 'path'
import { mkdir, readdir, rm, cp, lstat, copyFile } from 'fs/promises'

import { COMPONENTS } from '../components'
import { Waiting, Hint, Tertiary  } from '../theme'
import { PreviewArgs } from '../args'
import { Exec } from './exec'


export const PREVIEW_DIRNAME = '.tmplr-preview'

export function usePreviewEnv(args: PreviewArgs) {
  const { value, loading, error } = useAsync(async () => {
    // remove previous preview dir
    await rm(join(args.workdir, PREVIEW_DIRNAME), { recursive: true, force: true })

    // figure out directories and files to copy
    const previewdir = join(args.workdir, PREVIEW_DIRNAME, basename(args.workdir))
    const files = (await readdir(args.workdir)).map(file => join(args.workdir, file))

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

    return { workdir: previewdir }
  }, [args])

  return { env: value, loading, error }
}


export function Preview(args: PreviewArgs) {
  const { env, loading, error } = usePreviewEnv(args)

  return <>
    { loading && <Waiting>Setting up preview environment ...</Waiting> }
    { error && <COMPONENTS.Error error={error} message={error.message} /> }
    { !!env && <>
      <Hint>
        # <Newline/>
        # 👉 Preview in <Tertiary>
          {relative(process.cwd(), env.workdir)}
        </Tertiary>
        # <Newline/>
        #
      </Hint>
      <Exec repo={null} workdir={env.workdir} />
    </>}
  </>
}
