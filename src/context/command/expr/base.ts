import { Runnable } from '../base'


export abstract class Expr extends Runnable {
  protected abstract _eval(): Promise<string>

  async eval() {
    this.start()
    const res = await this._eval()
    this.end()

    return res
  }
}
