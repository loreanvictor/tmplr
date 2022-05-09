export class Deferred<T> {
  public resolve!: (value: T) => void
  public reject!: (reason: any) => void

  readonly promise = new Promise<T>((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })
}
