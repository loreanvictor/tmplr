import { IOAwareRunnable, IO, IOInterface, Prep } from '../io'
import { Deferred } from '../util/deferred'
import { Command } from './base'



export abstract class IOAwareCommand<_IO extends IO> extends Command implements IOAwareRunnable<void, _IO> {
  interface = new IOInterface<_IO>()

  protected async _run() {
    const prep = await this.prepare()
    const io = await this.interface.connect()
    const done = new Deferred<void>()

    this.onConnect(io, prep, done)

    await done.promise
    this.interface.unplug()
  }

  async prepare() { return {} }
  abstract onConnect(io: _IO, prep: Prep, deferred: Deferred<void>)
}
