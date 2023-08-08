import chalk from 'chalk'
import { WARNING } from '../theme'


export async function degitAndRun(repo: string) {
  return `
steps:
  - if:
      exists: '**/*'
    prompt: |
      This directory is NOT empty. Do you want to override its content?

    choices:
      - label: |
          ${chalk.hex(WARNING)('Yes, override all files in:')}
          {{ filesystem.root }}
        value: yes
      - 'No, cancel cloning.':
          skip: recipe

  - degit: '${repo}'
    to: .

  - if:
      exists: '.tmplr.yml'
    run: .tmplr.yml
    else:
      prompt: ${chalk.hex(WARNING).italic('Repository copied, but no templating recipes found.')}
`
}
