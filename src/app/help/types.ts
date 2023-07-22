export interface HelpArgs {
  help: true
}


export function isHelpArgs(args: any): args is HelpArgs {
  return 'help' in args
}
