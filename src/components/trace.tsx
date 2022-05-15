import React from 'react'
import { Transform, Text, Newline } from 'ink'
import chalk from 'chalk'
import SyntaxHihglight from 'ink-syntax-highlight'

import { HINT } from './theme'
import { Runnable } from '../context'
import serialize from '../serialize'


export interface TraceDisplayProps {
  active: Runnable
}

const transform = (text: string) => {
  return text.split('\n').map(line => chalk.hex(HINT)('⎢  ') + line).join('\n')
}


export function TraceDisplay({ active }: TraceDisplayProps) {
  return (
    <Transform transform={transform}>
      <Text color={HINT}>Error occured during the following:</Text>
      <Newline/><Newline/>
      <SyntaxHihglight language="yaml" code={serialize(active).trim()} />
      <Newline/>
    </Transform>
  )
}
