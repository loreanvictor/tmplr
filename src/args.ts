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

export interface PreviewArgs {
  preview: true
  workdir: string
}

export interface CleanArgs {
  clean: true
  workdir: string
}


export type Args = VersionArgs | HelpArgs | RepoArgs | PreviewArgs | CleanArgs


export function isVersionArgs(args: Args): args is VersionArgs {
  return 'version' in args
}

export function isHelpArgs(args: Args): args is HelpArgs {
  return 'help' in args
}

export function isRepoArgs(args: Args): args is RepoArgs {
  return 'repo' in args
}

export function isPreviewArgs(args: Args): args is PreviewArgs {
  return 'preview' in args
}

export function isCleanArgs(args: Args): args is CleanArgs {
  return 'clean' in args
}


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
    return { repo: cmd || null, workdir }
  }
}


export function useArgs() {
  return useState(parseArgs)[0]
}
