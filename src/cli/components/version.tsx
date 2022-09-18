import React from 'react'
import { useAsync } from 'react-use'
import execa from 'execa'
import semver from 'semver'
import { Text } from 'ink'

import { version } from '../../../package.json'
import { Waiting,
  Warning,
  Success, Tertiary,
  Highlight, Hint,
} from './theme'


export function Version() {
  const latest = useAsync(async () => {
    return (await execa.command('npm show tmplr version')).stdout
  })

  const outOfDate = latest.value && semver.gt(latest.value!, version)
  const upToDate = latest.value && !outOfDate

  return <>
    <Text>
      Current version: <Hint>..........</Hint>
      { version ? <Highlight>{version}</Highlight> : <Waiting> </Waiting> }
    </Text>
    <Text>
      Latest version: <Hint>...........</Hint>
      { latest.value ? <Highlight>{latest.value}</Highlight> : <Waiting> </Waiting> }
    </Text>
    <Text> </Text>
    { latest.loading && <Waiting>Checking for updates...</Waiting> }
    { upToDate && <Success>Up to date!</Success> }
    { outOfDate &&
      <>
        <Warning>Update required!</Warning>
        <Text>  You can update the CLI by running the following: </Text>
        <Tertiary>  npm i -g tmplr@latest</Tertiary>
      </>
    }
  </>
}
