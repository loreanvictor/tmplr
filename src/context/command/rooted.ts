import { isAbsolute, join } from 'path'

import { Command } from './base'


export abstract class Rooted extends Command {
  constructor(
    readonly root: string
  ) { super() }

  protected path(p: string) {
    return isAbsolute(p) ? p : join(this.root, p)
  }
}
