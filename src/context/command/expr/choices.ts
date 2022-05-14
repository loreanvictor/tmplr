import { indent } from '../util/indent'
import { Expr } from './base'
import { IOAware, Prep, IO } from './io'
import { Deferred } from './util/deferred'


export interface Choice {
  label: string
  value: Expr
}


export interface ChoicesIO extends IO {
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

  summary(i) {
    return indent(
      `prompt: ${this.msg}\n` +
      'choices:\n' +
      indent(this.choices.map(c => `- ${c.label}:\n` + indent(c.value.summary(), 2)).join('\n'), 1)
      , i
    )
  }
}
