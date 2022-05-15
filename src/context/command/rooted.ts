import { join } from 'path'

import { Command } from './base'


export abstract class Rooted extends Command {
  constructor(
    readonly root: string
  ) { super() }

  protected path(p: string) {
    return join(this.root, p)
  }
}
