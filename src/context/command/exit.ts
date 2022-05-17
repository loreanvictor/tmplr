import { IO, Prep } from '../io'
import { Expr } from '../expr/base'
import { IOAwareCommand } from './io'
import { Deferred } from '../util/deferred'


export interface ExitIO extends IO {
  setMessage(msg: string): void
}


export class ExitSignal extends Error {
  constructor() {
    super('ExitSignal')
  }
}


export class Exit extends IOAwareCommand<ExitIO> {
  constructor(
    readonly msg: Expr
  ) { super() }

  async onConnect(io: ExitIO, _: Prep, deferred: Deferred<void>) {
    const msg = await this.delegate(this.msg, e => e.eval())
    io.setMessage(msg)
    deferred.reject(new ExitSignal())
  }
}
