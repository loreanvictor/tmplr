import React from 'react'

import { Version } from './version'
import { Hint, Highlight } from '../../../theme'


export const Logo = () => (
  <Highlight>
    {      '       ┓   '}                                                                  <Version/>
    {'\n'}{' ╋┏┳┓┏┓┃┏┓ '}<Hint>repo</Hint>
    {'\n'}{' ┗┛┗┗┣┛┗┛  '}<Hint>templating</Hint>
    {'\n'}{'     ┛     '}
  </Highlight>
)
