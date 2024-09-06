import yargs from 'yargs'
import { useState } from 'react'


export interface Args {
  flags: {
    help: boolean
    version: boolean
    dir: string
    subgroup: boolean
    skipWarnings: boolean
  }

  workdir: string
  command: string
  target: string
}


export function parseArgs(): Args {
  const parsed = yargs
    .help(false).alias('help', 'h')
    .version(false).alias('version', 'v')
    .alias('dir', 'd')
    .parseSync(process.argv.slice(2))

  const command = parsed._[0] as string
  const target = (parsed._[1] ?? parsed._[0]) as string
  const workdir = parsed['dir'] as string || process.cwd()

  return {
    flags: {
      help: parsed['help'] as boolean,
      version: parsed['version'] as boolean,
      dir: workdir,
      subgroup: parsed['subgroup'] as boolean,
      skipWarnings: parsed['skip-warnings'] as boolean,
    },
    workdir,
    command,
    target,
  }
}


export function useArgs() {
  return useState(parseArgs)[0]
}
