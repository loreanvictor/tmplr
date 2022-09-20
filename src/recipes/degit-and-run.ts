import chalk from 'chalk'
import { readdir } from 'fs/promises'
import { HINT, WARNING } from '../theme'


export async function degitAndRun(repo: string, workdir: string) {
  const files = await readdir(workdir)

  if (files.filter(file => file !== '.git' && file !== '.tmplr.yml').length === 0) {
    return `steps:\n  - degit: '${repo}'\n    to: .\n  - run: .tmplr.yml`
  } else {
    return `steps:
  - read: __override__
    prompt: |
      ${chalk.hex(WARNING).bold('This directory is not empty. Do you want to override its content?')}
      ${chalk.hex(HINT)(`You are in ${workdir}`)}
    choices:
      - 'Yes, override all files in this directory': yes
      - No: ''
  - if: __override__
    steps:
      - degit: '${repo}'
        to: .
      - run: .tmplr.yml
`
  }
}
