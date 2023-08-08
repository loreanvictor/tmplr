import React from 'react'
import { useAsync } from 'react-use'
import { rm } from 'fs/promises'
import { join } from 'path'

import { COMPONENTS } from '../../components'
import { Success, Waiting } from '../../theme'
import { PREVIEW_DIRNAME } from '../preview'


export interface CleanProps {
  workdir: string
}


export function Clean({ workdir }: CleanProps) {
  const { loading, error } = useAsync(async () => {
    await rm(join(workdir, PREVIEW_DIRNAME), { recursive: true, force: true })
  }, [workdir])

  return <>
    { loading && <Waiting>🧹 Cleaning up dev artifacts ...</Waiting> }
    { error && <COMPONENTS.Error error={error} message={error.message} /> }
    { !loading && !error && <Success>🧹 Dev artifacts cleaned up.</Success> }
  </>
}
