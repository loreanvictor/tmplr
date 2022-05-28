import { useEffect, useState } from 'react'
import { pipe, tap, finalize, observe } from 'streamlets'

import { Runnable } from '../../context'



export function useActiveRunnable(runnable: Runnable): [] | [Runnable, Runnable | undefined, Runnable[]] {
  const [ stack, update ] = useState<Runnable[] | undefined>(runnable.stack.last)

  useEffect(() => {
    const obs = pipe(
      runnable.stack,
      tap(_stack => update(_stack)),
      finalize(() => update(undefined)),
      observe
    )

    return () => obs.stop()
  }, [runnable])

  return stack ?
    [stack[stack.length - 1]!, stack[stack.length - 2], stack] :
    []
}


export function useRunnableState(runnable: Runnable) {
  const [active] = useActiveRunnable(runnable)

  return !!active
}
