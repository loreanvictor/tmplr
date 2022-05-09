import { Expr } from './base'
import { Deferred } from './util/deferred'


export interface PromptIO {
  setMessage(msg: string): void
  setDefault(value: string): void
  onValue(cb: (value: string) => void)
}


export class Prompt extends Expr {
  io = new Deferred<PromptIO>()

  constructor(
    readonly msg: string,
    readonly _default?: Expr
  ) { super() }

  plug(io: PromptIO) {
    this.io.resolve(io)
  }

  protected async _eval() {
    const io = await this.io.promise

    if (this._default) {
      io.setDefault(
        await this.delegate(this._default, e => e.eval())
      )
    }

    const deferred = new Deferred<string>()

    io.setMessage(this.msg)
    io.onValue(value => deferred.resolve(value))

    return deferred.promise
  }
}
