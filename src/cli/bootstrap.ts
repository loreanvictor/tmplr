import yargs from 'yargs'
import { useState } from 'react'
import { useMount } from 'react-use'

import { Execution } from '../context'
import { degitAndRun, runLocalRecipe, showVersion, showHelp } from './recipes'


function parseArgs() {
  const parsed = yargs
    .help(false).alias('help', 'h')
    .version(false).alias('version', 'v')
    .parseSync(process.argv.slice(2))

  return {
    repo: parsed._[0] as string,
    flags: parsed,
  }
}


export function bootstrap() {
  const args = parseArgs()

  if (args.flags['version']) {
    return showVersion()
  } else if (args.flags['help']) {
    return showHelp()
  } else if (args.repo) {
    return degitAndRun(args.repo)
  } else {
    return runLocalRecipe()
  }
}


export function useBootstrap(): {exec: undefined, loaded: false} | {exec: Execution, loaded: true} {
  const [exec, initialize] = useState<Execution | undefined>(undefined)
  useMount(() => initialize(bootstrap()))

  return exec ? { exec, loaded: true } : { exec, loaded: false }
}
