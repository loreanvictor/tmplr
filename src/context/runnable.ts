import { replay, Subject, tap, observe, map, pipe, finalize } from 'streamlets'


export abstract class Runnable {
  readonly stack = replay(new Subject<Runnable[]>())

  running() {
    return !!this.stack.last
  }

  protected start() {
    this.stack.receive([this])
  }

  protected end() {
    this.stack.end()
  }

  protected async delegate<T, R extends Runnable>(runnable: R, fn: (r: R) => Promise<T>) {
    if (!this.running()) {
      throw new Error('Inactive Runnable')
    }

    pipe(
      runnable.stack,
      map(stack => [this, ...stack]),
      tap(stack => this.stack.receive(stack)),
      finalize(() => this.stack.receive([this])),
      observe
    )

    return await fn(runnable)
  }
}
