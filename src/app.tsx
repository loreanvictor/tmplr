import React from 'react'

import { Waiting } from './components/theme'
import { ExecDisplay } from './components'
import { useBootstrap } from './bootstrap'


export function App() {
  const exec = useBootstrap()

  if (!exec) {
    return <Waiting>Loading config ...</Waiting>
  } else {
    return <ExecDisplay exec={exec!} />
  }
}
