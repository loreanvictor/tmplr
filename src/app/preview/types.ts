export interface PreviewArgs {
  preview: true
  workdir: string
}


export function isPreviewArgs(args: any): args is PreviewArgs {
  return 'preview' in args
}
