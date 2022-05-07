export type CachedFunction<T> = {
  (): Promise<T>
  __cache?: T
  __cached: boolean
}


export function cached<T>(fn: () => Promise<T>) {
  const _cached: CachedFunction<T> = (async() => {
    if (!_cached.__cached) {
      _cached.__cache = await fn()
      _cached.__cached = true
    }

    return _cached.__cache!
  }) as any
  _cached.__cached = false

  return _cached
}
