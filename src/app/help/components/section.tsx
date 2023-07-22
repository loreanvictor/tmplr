import React from 'react'
import { Text } from 'ink'

import { Newline } from './newline'


interface SectionProps {
  title: string
  children: React.ReactNode
}

export const Section = ({ title, children }: SectionProps) => (
  <>
    <Text italic>{title}:</Text>
    {children}
    <Newline/>
  </>
)
