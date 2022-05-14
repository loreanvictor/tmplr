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

  // TODO: fix this
  summary() {
    return `steps: ${this.steps.map(s => s.summary()).join('\n')}`
  }
}
