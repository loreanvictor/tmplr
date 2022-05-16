import { relative, isAbsolute } from 'path'


export function isSubPath(base: string, path: string) {
  const rel = relative(base, path)

  return !isAbsolute(rel) && !rel.startsWith('..')
}


export function checkSubPath(path: string, base = process.cwd()) {
  if (!isSubPath(base, path)) {
    throw new Error(`${path} is not in current working directory.`)
  }
}
