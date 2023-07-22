import React from 'react'

import { Exec, isExecArgs } from './exec'
import { Help, isHelpArgs } from './help'
import { Preview, isPreviewArgs } from './preview'
import { Version, isVersionArgs } from './version'
import { Clean, isCleanArgs } from './clean'
import { useArgs } from './args'


export function App() {
  const args = useArgs()

  return <>
    { isHelpArgs(args) && <Help /> }
    { isVersionArgs(args) && <Version /> }
    { isPreviewArgs(args) && <Preview {...args} /> }
    { isCleanArgs(args) && <Clean {...args} /> }
    { isExecArgs(args) && <Exec {...args} />}
  </>
}
