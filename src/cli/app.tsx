import React from 'react'

import { Waiting } from './components/theme'
import { ExecDisplay } from './components'
import { useBootstrap } from './bootstrap'


export function App() {
  const { exec, loaded } = useBootstrap()

  if (!loaded) {
    return <Waiting>Loading ...</Waiting>
  } else {
    return <ExecDisplay exec={exec} />
  }
}
