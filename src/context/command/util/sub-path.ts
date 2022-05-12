import { relative, isAbsolute } from 'path'


export function isSubPath(base: string, path: string) {
  const rel = relative(base, path)

  return !!rel && !isAbsolute(rel) && !rel.startsWith('..')
}
