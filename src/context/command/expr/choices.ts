import { Expr } from './base'
import { IOAware, Prep } from './io'
import { Deferred } from './util/deferred'


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

  protected connect(io: ChoicesIO, _: Prep, deferred: Deferred<string>) {
    io.setMessage(this.msg)
    io.setChoices(this.choices)
    io.onSelect(choice =>
      this.delegate(choice.value, e => e.eval())
        .then(deferred.resolve)
        .catch(deferred.reject)
    )
  }

  // TODO: fix this with indentation
  summary() {
    return `prompt: ${this.msg}\nchoices: ${this.choices.map(c => c.label).join(', ')}`
  }
}
