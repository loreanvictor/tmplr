import React from 'react'
import { Text } from 'ink'
import { useAsync } from 'react-use'

import { createContext } from './context'


const context = createContext()

export function App() {
  const url = useAsync(() => context.scope.get('git.remote_owner'))
  const initer = useAsync(() => context.scope.get('path.dirname'))

  return (
    <>
      <Text>{ url.loading ? 'loading ...' : `${url.value}` }</Text>
      <Text>{ initer.loading ? 'loading ...' : `${initer.value}` }</Text>
    </>
  )
}
