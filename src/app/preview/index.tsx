import React from 'react'
import { Newline } from 'ink'

import { relative } from 'path'

import { COMPONENTS } from '../../components'
import { Waiting, Hint, Tertiary  } from '../../theme'
import { Exec } from '../exec'
import { usePreviewEnv } from './env'


export interface PreviewProps {
  workdir: string
  use?: boolean
}


export function Preview({workdir, use}: PreviewProps) {
  const { runtime, loading, error } = usePreviewEnv(workdir, use)

  return <>
    { loading && <Waiting>Setting up preview environment ...</Waiting> }
    { error && <COMPONENTS.Error error={error} message={error.message} /> }
    { !!runtime && <>
      <Hint>
        # <Newline/>
        # 👉 Preview in <Tertiary>
          {relative(process.cwd(), runtime.workdir)}
        </Tertiary>
        <Newline/>
        #
      </Hint>
      <Exec runtime={runtime} />
    </>}
  </>
}


export { PREVIEW_DIRNAME } from './env'
