import React from 'react'
import { Text } from 'ink'
import SyntaxHihglight from 'ink-syntax-highlight'

import { HINT } from './theme'
import { Runnable } from '../context'
import serialize from '../serialize'


export interface TraceDisplayProps {
  active: Runnable
}

const PREFIX = '│ '

export function TraceDisplay({ active }: TraceDisplayProps) {
  return (
    <>
      <Text color={HINT}>
        {PREFIX}
        <Text color={HINT}>Error occured during the following:</Text>
      </Text>
      <Text color={HINT}>{PREFIX}</Text>
      <Text color={HINT}>
        {PREFIX}
        <SyntaxHihglight language="yaml" code={serialize(active).trim()} />
      </Text>
      <Text color={HINT}>{PREFIX}</Text>
    </>
  )
}
