import chalk from 'chalk'

import { HINT } from '../components/theme'
import { parse } from '../../parse'


export const degitAndRun = (repo: string) => parse({
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
    { degit: repo, },
    { run: '.tmplr.yml' },
  ]
})
