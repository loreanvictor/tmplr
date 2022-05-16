import { useState } from 'react'
import { useMount } from 'react-use'

import { Execution, parse } from './parse'


export function bootstrap() {
  if (process.argv.length === 3) {
    return parse({
      steps: [
        { degit: process.argv[2], },
        { run: '.tmplr.yml' },
      ]
    })
  } else {
    return parse({ run: '.tmplr.yml' })
  }
}


export function useBootstrap() {
  const [exec, initialize] = useState<Execution | undefined>(undefined)
  useMount(() => initialize(bootstrap()))

  return exec
}
