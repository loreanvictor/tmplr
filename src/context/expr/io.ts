import { IOAwareRunnable, IO, IOInterface, Prep } from '../io'
import { Deferred } from '../util/deferred'
import { Expr } from './base'



export abstract class IOAwareExpr<_IO extends IO> extends Expr implements IOAwareRunnable<string, _IO> {
  interface = new IOInterface<_IO>()

  protected async _eval() {
    const prep = await this.prepare()
    const io = await this.interface.connect()
    const value = new Deferred<string>()

    this.onConnect(io, prep, value)

    const res = await value.promise

    io.disconnect()
    this.interface.unplug()

    return res
  }

  async prepare() { return {} }
  abstract onConnect(io: _IO, prep: Prep, deferred: Deferred<string>)
}
