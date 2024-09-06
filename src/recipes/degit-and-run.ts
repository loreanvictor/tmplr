import chalk from 'chalk'
import { WARNING } from '../theme'


export interface DegitAndRunOptions {
  subgroup?: boolean,
  warnOnNoRecipe?: boolean,
}

export async function degitAndRun(repo: string, options: DegitAndRunOptions = {}) {
  const warnOnNoRecipe = options.warnOnNoRecipe ?? true
  const subgroup = options.subgroup ?? false

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
    subgroup: ${subgroup ? 'true' : 'false'}

  - if:
      exists: '.tmplr.yml'
    run: .tmplr.yml
    ${
      warnOnNoRecipe ? `
    else:
      prompt: ${chalk.hex(WARNING).italic('Repository copied, but no templating recipes found.')}
      ` : ''
    }
`
}
