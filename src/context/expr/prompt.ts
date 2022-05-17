import { Expr } from './base'
import { Prep, IO } from '../io'
import { IOAwareExpr } from './io'
import { Deferred } from '../util/deferred'


export interface PromptIO extends IO {
  setMessage(msg: string): void
  setDefault(value: string): void
  onValue(cb: (value: string) => void)
}


export class Prompt extends IOAwareExpr<PromptIO> {

  constructor(
    readonly msg: string,
    readonly _default?: Expr
  ) { super() }


  override async prepare() {
    const prep: Prep = {}

    if (this._default) {
      prep['default'] = await this.delegate(this._default, e => e.eval())
    }

    return prep
  }

  onConnect(io: PromptIO, prep: Prep, deferred: Deferred<string>) {
    if ('default' in prep) {
      io.setDefault(prep['default'])
    }

    io.setMessage(this.msg)
    io.onValue(v => deferred.resolve(v))
  }
}
