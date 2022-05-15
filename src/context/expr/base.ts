import { Runnable } from '../runnable'


export abstract class Expr extends Runnable {
  protected abstract _eval(): Promise<string>

  async eval() {
    this.start()
    const res = await this._eval()
    this.end()

    return res
  }
}
