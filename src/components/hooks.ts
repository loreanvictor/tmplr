import { useEffect, useState } from 'react'
import { useToggle } from 'react-use'
import { pipe, tap, observe, first, last } from 'streamlets'

import { Runnable } from '../context/command'


export function useRunnableState(runnable: Runnable) {
  const [running, toggle] = useToggle(runnable.running())

  useEffect(() => {
    first(runnable.active).then(() => toggle(true))
    last(runnable.active).then(() => toggle(false))
  }, [runnable])

  return running
}


export function useActiveRunnable(runnable: Runnable) {
  const [active, mark] = useState<Runnable | null>(runnable.active.last)

  useEffect(() => {
    const obs = pipe(runnable.active, tap(mark), observe)

    return () => obs.stop()
  }, [runnable])

  return active
}
