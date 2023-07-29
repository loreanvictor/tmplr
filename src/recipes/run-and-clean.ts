import { dirname } from 'path'


export function runAndClean(path: string) {
  return `
steps:
  - run: ${path}
  - remove: ${dirname(path)}
  `
}
