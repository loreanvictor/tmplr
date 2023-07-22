import React from 'react'
import { Text } from 'ink'
import link from 'terminal-link'

import { ACCENT } from '../../../theme'
import { version } from '../../../../package.json'


export const Version = () => (
  <Text inverse color={ACCENT}>
    {link(' v' + version + ' ', 'https://npmjs.com/tmplr', { fallback: _ => _ })}
  </Text>
)
