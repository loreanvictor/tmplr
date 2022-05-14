import { Command } from './base'
import { indent } from './util/indent'


export class Steps extends Command {
  constructor(
    readonly steps: Command[]
  ) { super() }

  protected async _run() {
    for (const step of this.steps) {
      await this.delegate(step, s => s.run())
    }
  }

  summary(i) {
    return indent(`steps:\n${indent(this.steps.map(s =>  '- ' + indent(s.summary(), 1).slice(2)).join('\n'), 1)}`, i)
  }
}
