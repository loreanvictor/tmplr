import { replay, Subject, tap, observe, map, pipe } from 'streamlets'


// TODO: add abstract validation and check it on start
export class Runnable {
  readonly active = replay(new Subject<Runnable>())

  running() {
    return !!this.active.last
  }

  protected start() {
    this.active.receive(this)
  }

  protected end() {
    this.active.end()
  }

  protected async delegate<T, R extends Runnable>(runnable: R, fn: (r: R) => Promise<T>) {
    if (!this.active.last) {
      throw new Error('Inactive Runnable')
    }

    pipe(
      runnable.active,
      map(active => active || this),
      tap(active => this.active.receive(active)),
      observe
    )

    return await fn(runnable)
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
