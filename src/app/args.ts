import yargs from 'yargs'
import { useState } from 'react'

import { VersionArgs } from './version'
import { HelpArgs } from './help'
import { ExecArgs } from './exec'
import { PreviewArgs } from './preview'
import { CleanArgs } from './clean'


export type Args = VersionArgs | HelpArgs | ExecArgs | PreviewArgs | CleanArgs


export function parseArgs(): Args {
  const parsed = yargs
    .help(false).alias('help', 'h')
    .version(false).alias('version', 'v')
    .alias('dir', 'd')
    .parseSync(process.argv.slice(2))

  const cmd = parsed._[0] as string
  const workdir = parsed['dir'] as string || process.cwd()

  if (parsed['help'] || cmd === 'help') {
    return { help: true }
  } else if (parsed['version'] || cmd === 'version') {
    return { version: true }
  } else if (cmd === 'preview') {
    return { preview: true, workdir }
  } else if (cmd === 'clean') {
    return { clean: true, workdir }
  } else {
    if (cmd) {
      if (cmd.startsWith('local:')) {
        return { exec: true, path: cmd.slice(6), workdir }
      } else {
        return { exec: true, repo: cmd, workdir }
      }
    } else {
      return { exec: true, workdir }
    }
  }
}


export function useArgs() {
  return useState(parseArgs)[0]
}
