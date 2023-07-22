import React from 'react'
import { Newline } from 'ink'

import { relative } from 'path'

import { COMPONENTS } from '../../components'
import { Waiting, Hint, Tertiary  } from '../../theme'
import { Exec } from '../exec'
import { PreviewArgs } from './types'
import { usePreviewEnv } from './env'


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
      <Exec exec={true} workdir={env.workdir} />
    </>}
  </>
}
