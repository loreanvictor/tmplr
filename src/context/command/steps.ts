import { Command } from './base'


export class Steps extends Command {
  constructor(
    readonly steps: Command[]
  ) { super() }

  protected async _run() {
    for (const step of this.steps) {
      await this.delegate(step, s => s.run())
    }
  }
}
