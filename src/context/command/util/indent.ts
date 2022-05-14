export function indent(str: string, i = 0) {
  return str.split('\n').map(line => `${'  '.repeat(i)}${line}`).join('\n')
}
