import { indent } from '../util/indent'
import { Expr } from './base'
import { IOAware, Prep, IO } from './io'
import { Deferred } from './util/deferred'


export interface PromptIO extends IO {
  setMessage(msg: string): void
  setDefault(value: string): void
  onValue(cb: (value: string) => void)
}


export class Prompt extends IOAware<PromptIO> {

  constructor(
    readonly msg: string,
    readonly _default?: Expr
  ) { super() }


  protected override async prepare() {
    const prep: Prep = {}

    if (this._default) {
      prep['default'] = await this.delegate(this._default, e => e.eval())
    }

    return prep
  }

  protected connect(io: PromptIO, prep: Prep, deferred: Deferred<string>) {
    if ('default' in prep) {
      io.setDefault(prep['default'])
    }

    io.setMessage(this.msg)
    io.onValue(v => deferred.resolve(v))
  }

  summary(i) {
    return indent(
      `prompt: ${this.msg}`
      + (this._default ? `\ndefault:\n${this._default.summary(1)}` : '')
      , i
    )
  }
}
