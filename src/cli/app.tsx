import React from 'react'

import { isHelpArgs, isRepoArgs, isVersionArgs, useArgs } from './args'
import { Exec, Help, Version } from './components'


export function App() {
  const args = useArgs()

  return <>
    { isHelpArgs(args) && <Help /> }
    { isVersionArgs(args) && <Version /> }
    { isRepoArgs(args) && <Exec repo={args.repo} />}
  </>
}
