import yargs from 'yargs'
import { useState } from 'react'


export interface VersionArgs {
  version: true
}

export interface HelpArgs {
  help: true
}

export interface RepoArgs {
  repo: string | null
  workdir: string
}

export type Args = VersionArgs | HelpArgs | RepoArgs


export function isVersionArgs(args: Args): args is VersionArgs {
  return 'version' in args
}

export function isHelpArgs(args: Args): args is HelpArgs {
  return 'help' in args
}

export function isRepoArgs(args: Args): args is RepoArgs {
  return 'repo' in args
}


export function parseArgs(): Args {
  const parsed = yargs
    .help(false).alias('help', 'h')
    .version(false).alias('version', 'v')
    .alias('dir', 'd')
    .parseSync(process.argv.slice(2))

  if (parsed['help']) {
    return { help: true }
  } else if (parsed['version']) {
    return { version: true }
  } else {
    return {
      ...parsed,
      repo: (parsed._[0] as string) || null,
      workdir: (parsed['dir'] as string) || process.cwd(),
    }
  }
}


export function useArgs() {
  return useState(parseArgs)[0]
}
