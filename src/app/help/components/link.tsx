import React from 'react'
import link from 'terminal-link'
import { Transform } from 'ink'

import { Accent } from '../../../theme'


interface LinkProps {
  children: React.ReactNode
  url: string
}

export const Link = ({ children, url }: LinkProps) => (
  <Transform transform={text => link(text, url)}>
    <Accent>{children}</Accent>
  </Transform>
)
