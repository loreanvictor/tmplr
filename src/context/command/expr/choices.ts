import { Expr } from './base'
import { IOAware, Prep } from './io'


export interface Choice {
  label: string
  value: Expr
}


export interface ChoicesIO {
  setMessage(msg: string): void
  setChoices(choices: Choice[]): void
  onSelect(cb: (choice: Choice) => void)
}


export class Choices extends IOAware<ChoicesIO> {
  constructor(
    readonly msg: string,
    readonly choices: Choice[]
  ) { super() }

  protected connect(io: ChoicesIO, _: Prep, resolve: (value: string) => void) {
    io.setMessage(this.msg)
    io.setChoices(this.choices)
    io.onSelect(choice => this.delegate(choice.value, e => e.eval()).then(resolve))
  }
}
