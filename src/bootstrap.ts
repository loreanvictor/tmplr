import chalk from 'chalk'
import { useState } from 'react'
import { useMount } from 'react-use'

import { HINT } from './components/theme'
import { Execution, parse } from './parse'


export function bootstrap() {
  if (process.argv.length === 3) {
    return parse({
      steps: [
        {
          read: '__override__',
          from: 'path.rootempty',
          fallback: {
            prompt: 'Current folder is not empty. Do you want to override its files?' +
              '\n  ' + chalk.hex(HINT)(`You are in ${process.cwd()}`) +
              '\n',
            choices: [
              {
                No: {
                  eval: 'no',
                  steps: [{ exit: 'See you later, space cowboy!' }]
                }
              },
              { 'Yes, override files in this folder': 'yes' },
            ]
          }
        },
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
