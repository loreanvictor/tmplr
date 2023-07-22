import React from 'react'
import { useAsync } from 'react-use'
import { rm } from 'fs/promises'
import { join } from 'path'

import { COMPONENTS } from '../components'
import { Success, Waiting } from '../theme'
import { PREVIEW_DIRNAME } from './preview'


export interface CleanArgs {
  clean: true
  workdir: string
}


export function isCleanArgs(args: any): args is CleanArgs {
  return 'clean' in args
}


export function Clean(args: CleanArgs) {
  const { loading, error } = useAsync(async () => {
    await rm(join(args.workdir, PREVIEW_DIRNAME), { recursive: true, force: true })
  }, [args])

  return <>
    { loading && <Waiting>🧹 Cleaning up dev artifacts ...</Waiting> }
    { error && <COMPONENTS.Error error={error} message={error.message} /> }
    { !loading && !error && <Success>🧹 Dev artifacts cleaned up.</Success> }
  </>
}
