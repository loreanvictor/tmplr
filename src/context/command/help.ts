import { Command } from './base'
import { ExitSignal } from './exit'


export class Help extends Command {
  constructor(
  ) {
    super()
  }

  protected async _run() {
    throw new ExitSignal(false)
  }
}
