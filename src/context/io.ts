import { Runnable } from './runnable'
import { Deferred } from './util/deferred'


export interface IO {
  disconnect()
}

export type Connector<_IO extends IO> = () => _IO


export interface Prep {
  [key: string]: any
}


export class IOInterface<_IO extends IO> {
  private connector: Connector<_IO> | undefined
  private connected = new Deferred<void>()

  async connect() {
    await this.connected.promise

    return this.connector!()
  }

  plug(connector: Connector<_IO>) {
    this.connector = connector
    this.connected.resolve()
  }

  unplug() {
    this.connector = undefined
    this.connected = new Deferred<void>()
  }
}


export interface IOAwareRunnable<T, _IO extends IO> extends Runnable {
  interface: IOInterface<_IO>
  prepare(): Promise<Prep>
  onConnect(_io: _IO, prep: Prep, deferred: Deferred<T>)
}
