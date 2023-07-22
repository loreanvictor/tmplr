import React from 'react'
import { Text } from 'ink'

import { Tertiary, Hint } from '../../../theme'


interface CommandProps {
  cmd: string
  children: React.ReactNode
}

export const Command = ({ cmd, children }: CommandProps) => (
  <Text>
    <Tertiary>{cmd} </Tertiary>
    <Hint>{'......................................'.substring(cmd.length)} </Hint>
    {children}
  </Text>
)
