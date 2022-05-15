import { useEffect, useState } from 'react'
import { pipe, tap, finalize, observe } from 'streamlets'

import { Runnable } from '../context'



export function useActiveRunnable(runnable: Runnable) {
  const [active, mark] = useState<Runnable | null>(runnable.active.last)

  useEffect(() => {
    const obs = pipe(
      runnable.active,
      tap(_active => mark(_active)),
      finalize(() => mark(null)),
      observe
    )

    return () => obs.stop()
  }, [runnable])

  return active
}


export function useRunnableState(runnable: Runnable) {
  const active = useActiveRunnable(runnable)

  return !!active
}
