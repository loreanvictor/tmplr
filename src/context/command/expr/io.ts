import { Expr } from './base'
import { Deferred } from './util/deferred'


export interface IO {
  disconnect()
}

export type Connector<_IO extends IO> = () => _IO


export interface Prep {
  [key: string]: any
}


export abstract class IOAware<_IO extends IO> extends Expr {
  private connector: Connector<_IO> | undefined
  private connected = new Deferred<void>()

  public plug(connector: Connector<_IO>) {
    this.connector = connector
    this.connected.resolve()
  }

  public unplug() {
    this.connector = undefined
    this.connected = new Deferred<void>()
  }

  protected async prepare(): Promise<Prep> {
    return {}
  }

  protected abstract connect(io: IO, prep: Prep, deferred: Deferred<string>)

  protected async _eval() {
    const prep = await this.prepare()
    await this.connected.promise

    const value = new Deferred<string>()
    const io = this.connector!()
    this.connect(io, prep, value)

    const res = await value.promise

    io.disconnect()
    this.unplug()

    return res
  }
}
