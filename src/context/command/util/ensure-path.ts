import { mkdir } from 'fs/promises'
import { dirname } from 'path'


export async function ensurePath(path: string) {
  const dir = dirname(path)
  if (dir !== '.') {
    await mkdir(dir, { recursive: true })
  }
}
