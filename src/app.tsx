import React from 'react'
import { Text } from 'ink'
import { useAsync } from 'react-use'

import { get } from './store'


export function App() {
  const url = useAsync(() => get('git.remote_owner'))
  const initer = useAsync(() => get('path.dirname'))

  return (
    <>
      <Text>{ url.loading ? 'loading ...' : `${url.value}` }</Text>
      <Text>{ initer.loading ? 'loading ...' : `${initer.value}` }</Text>
    </>
  )
}
