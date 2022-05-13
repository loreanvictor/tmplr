import { access } from 'fs/promises'
import { checkSubPath } from './sub-path'


export async function checkFile(filePath: string) {
  try {
    await access(filePath)
  } catch {
    throw new Error(`Cannot find or access ${filePath}`)
  }

  await checkSubPath(filePath)
}
