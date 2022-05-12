import { Expr } from './base'
import { IOAware, Prep } from './io'


export interface PromptIO {
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

  protected connect(io: PromptIO, prep: Prep, resolve: (value: string) => void) {
    if ('default' in prep) {
      io.setDefault(prep['default'])
    }

    io.setMessage(this.msg)
    io.onValue(resolve)
  }
}
