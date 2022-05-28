import React, { useEffect, useState } from 'react'
import { Text } from 'ink'

import { Waiting, Warning, Success, Highlight, Hint, Tertiary } from '../theme'
import { Version } from '../../../context/command'


export interface ShowVersionProps {
  version: Version
}


export function ShowVersion({ version }: ShowVersionProps) {
  const [current, setCurrent] = useState('')
  const [latest, setLatest] = useState('')
  const [state, setState] = useState<'loading' | 'update-required' | 'up-to-date'>('loading')

  useEffect(() => {
    version.interface.plug(() => ({
      setCurrent, setLatest,
      loading: () => setState('loading'),
      updateRequired: () => setState('update-required'),
      upToDate: () => setState('up-to-date'),
      disconnect: () => {},
    }))

    return () => version.interface.unplug()
  }, [version])

  return <>
    <Text>
      Current version: <Hint>..........</Hint>
      { current ? <Highlight>{current}</Highlight> : <Waiting> </Waiting> }
    </Text>
    <Text>
      Latest version: <Hint>...........</Hint>
      { latest ? <Highlight>{latest}</Highlight> : <Waiting> </Waiting> }
    </Text>
    <Text> </Text>
    { state === 'loading' && <Waiting>Checking for updates...</Waiting> }
    { state === 'up-to-date' && <Success>Up to date!</Success> }
    { state === 'update-required' &&
      <>
        <Warning>Update required!</Warning>
        <Text>  You can update the CLI by running the following: </Text>
        <Tertiary>  npm i -g tmplr@latest</Tertiary>
      </>
    }
  </>
}
