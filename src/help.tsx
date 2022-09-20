import React from 'react'
import { Text } from 'ink'

import { Highlight, Tertiary, Accent  } from './theme'


export function Help() {
  return <>
    <Text> </Text>
    <Highlight># tmplr: repo templating</Highlight>
    <Text>Copies contents of a repository and runs its templating recipes.</Text>
    <Text> </Text>
    <Text italic>Usage:</Text>
    <Tertiary>tmplr</Tertiary>
    <Tertiary>tmplr USER/REPO</Tertiary>
    <Tertiary>tmplr -d   |   tmplr --dir</Tertiary>
    <Tertiary>tmplr -h   |   tmplr --help</Tertiary>
    <Tertiary>tmplr -v   |   tmplr --version</Tertiary>
    <Text> </Text>
    <Text>
      Check the docs for more information on usage and options:
    </Text>
    <Accent>https://github.com/loreanvictor/tmplr</Accent>
    <Text> </Text>
  </>
}
