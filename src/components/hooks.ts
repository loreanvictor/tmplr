import { useEffect, useState } from 'react'
import { useToggle } from 'react-use'

import { Runnable } from '../context/command'


export function useRunnableState(runnable: Runnable) {
  const [running, toggle] = useToggle(runnable.running())

  useEffect(() => {
    runnable.onStart(() => toggle(true))
    runnable.onEnd(() => toggle(false))
  }, [runnable])

  return running
}


export function useActiveRunnable(runnable: Runnable) {
  const [active, mark] = useState<Runnable | null>(runnable.active())

  useEffect(() => {
    runnable.onStateChange(() => {
      // console.log(runnable.active()?.constructor.name || 'null')
      mark(runnable.active())
    })
  }, [runnable])

  return active
}
