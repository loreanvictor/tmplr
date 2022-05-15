import { Runnable } from '../runnable'


export abstract class Command extends Runnable {
  protected abstract _run(): Promise<void>
  async run() {
    this.start()
    await this._run()
    this.end()
  }
}
