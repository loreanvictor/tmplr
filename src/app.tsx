import React from 'react'

import { isHelpArgs, isRepoArgs, isVersionArgs, useArgs } from './args'
import { Exec } from './exec'
import { Help } from './help'
import { Version } from './version'


export function App() {
  const args = useArgs()

  return <>
    { isHelpArgs(args) && <Help /> }
    { isVersionArgs(args) && <Version /> }
    { isRepoArgs(args) && <Exec {...args} />}
  </>
}
