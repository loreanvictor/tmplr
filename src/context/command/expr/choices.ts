import { Expr } from './base'
import { IOAware, Prep } from './io'


export interface Choice {
  label: string
  value: Expr
}


interface ResolvedChoice {
  label: string
  value: string
}


export interface ChoicesIO {
  setMessage(msg: string): void
  setChoices(choices: ResolvedChoice[]): void
  onSelect(cb: (choice: ResolvedChoice) => void)
}


export class Choices extends IOAware<ChoicesIO> {
  constructor(
    readonly msg: string,
    readonly choices: Choice[]
  ) { super() }

  protected async prepare() {
    const prep: Prep = {}
    prep['choices'] = []

    for (const choice of this.choices) {
      prep['choices'].push({
        label: choice.label,
        value: await this.delegate(choice.value, e => e.eval())
      })
    }

    return prep
  }

  protected connect(io: ChoicesIO, prep: Prep, resolve: (value: string) => void) {
    io.setMessage(this.msg)
    io.setChoices(prep['choices'])
    io.onSelect(choice => resolve(choice.value))
  }
}
