export class Runnable {
  private _active: Runnable | null = null
  private _startl: (() => void)[] = []
  private _endl: (() => void)[] = []
  private _schangel: ((active: Runnable | null) => void)[] = []

  onStart(cb: () => void) {
    this._startl.push(cb)
  }

  onEnd(cb: () => void) {
    this._endl.push(cb)
  }

  onStateChange(cb: () => void) {
    this._schangel.push(cb)
  }

  active(): Runnable | null {
    if (this._active === this) {
      return this
    } else if (this._active) {
      return this._active.active() || this
    }

    return null
  }

  running() {
    return this.active() !== null
  }

  protected start() {
    this._active = this
    this._startl.forEach(cb => cb())
    this.notifyStateChange()
  }

  protected end() {
    this._active = null
    this._endl.forEach(cb => cb())
    this.notifyStateChange()
  }

  protected async delegate<T, R extends Runnable>(runnable: R, fn: (r: R) => Promise<T>) {
    if (!this._active) {
      throw new Error('Inactive Runnable')
    }

    runnable.onStateChange(() => {
      this._active = runnable.active() || this
      this.notifyStateChange()
    })

    return await fn(runnable)
  }

  private notifyStateChange() {
    this._schangel.forEach(cb => cb(this.active()))
  }
}


export abstract class Command extends Runnable {
  protected abstract _run(): Promise<void>
  async run() {
    this.start()
    await this._run()
    this.end()
  }
}
