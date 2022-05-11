import React from 'react'
import { readFile } from 'fs/promises'
import { useAsync } from 'react-use'

import { Waiting, Error } from './components/theme'
import { parse } from './parse'
import { ExecDisplay } from './components'


export function App() {
  const exec = useAsync(async () => parse(await readFile('.tmplr.yml', 'utf8')))

  if (exec.loading) {
    return <Waiting>Loading config ...</Waiting>
  } else if (exec.error) {
    return <Error>{exec.error.message}</Error>
  } else {
    return <ExecDisplay exec={exec.value!} />
  }
}
