interface BaseExecArgs {
  workdir: string
  exec: true
}

export interface RemoteTemplateArgs extends BaseExecArgs {
  repo: string
}

export interface LocalTemplateArgs extends BaseExecArgs {
  path: string
}

export type LocalRecipeArgs = BaseExecArgs

function isBaseExecArgs(args: any): args is BaseExecArgs {
  return 'workdir' in args && 'exec' in args && args.exec
}


export function isRemoteTemplateArgs(args: BaseExecArgs): args is RemoteTemplateArgs {
  return 'repo' in args
}


export function isLocalTemplateArgs(args: BaseExecArgs): args is LocalTemplateArgs {
  return 'path' in args
}


export type ExecArgs = RemoteTemplateArgs | LocalTemplateArgs | LocalRecipeArgs


export function isExecArgs(args: any): args is ExecArgs {
  return isBaseExecArgs(args)
}
