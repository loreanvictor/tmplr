import { Expr } from './base'
import { Deferred } from './util/deferred'


export type Connector<IO> = () => IO


export interface Prep {
  [key: string]: any
}


export abstract class IOAware<IO> extends Expr {
  private connector: Connector<IO> | undefined
  private connected = new Deferred<void>()

  public plug(connector: Connector<IO>) {
    this.connector = connector
    this.connected.resolve()
  }

  public unplug(connector: Connector<IO>) {
    if (this.connector === connector) {
      this.connector = undefined
      this.connected = new Deferred<void>()
    }
  }

  protected async prepare(): Promise<Prep> {
    return {}
  }

  protected abstract connect(io: IO, prep: Prep, resolve: (value: string) => void)

  protected async _eval() {
    const prep = await this.prepare()
    await this.connected.promise

    const value = new Deferred<string>()
    this.connect(this.connector!(), prep, v => value.resolve(v))

    return await value.promise
  }
}
