import React, { useEffect } from 'react'

import { Exit } from '../../context/command'


export interface ExitLogProps {
  exit: Exit
}


export function ExitLog({ exit }: ExitLogProps) {
  useEffect(() => {
    exit.interface.plug(() => ({
      setMessage: (msg: string) => {
        console.log('🍺 ' + msg)
      },
      disconnect: () => {}
    }))

    return () => exit.interface.unplug()
  }, [exit])

  return <></>
}
