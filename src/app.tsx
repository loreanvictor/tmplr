import React from 'react'

import { isCleanArgs, isHelpArgs, isPreviewArgs, isRepoArgs, isVersionArgs, useArgs } from './args'
import { Exec, Preview, Clean, Version, Help } from './commands'


export function App() {
  const args = useArgs()

  return <>
    { isHelpArgs(args) && <Help /> }
    { isVersionArgs(args) && <Version /> }
    { isPreviewArgs(args) && <Preview {...args} /> }
    { isCleanArgs(args) && <Clean {...args} /> }
    { isRepoArgs(args) && <Exec {...args} />}
  </>
}
