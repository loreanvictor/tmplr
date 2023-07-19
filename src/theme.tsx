import React, { useState } from 'react'
import { useInterval } from 'react-use'
import { Text } from 'ink'
import Spinner from 'ink-spinner'


export const PRIMARY = '#F1DDBF'
export const ACCENT = '#0AA1DD'
export const TERTIARY = '#9772FB'
export const SUCCESS = '#97DBAE'
export const WARNING = '#EC9B3B'
export const ERROR = '#F24A72'
export const BGERROR = '#850E35'
export const FADE = '#5584AC'
export const HINT = '#22577E'
export const Q = [
  '#0AA1DD', '#0992C9', '#0884B5', '#0775A1', '#06668D', '#055879', '#054964',
  '#055879', '#06668D', '#0775A1', '#0884B5', '#0992C9', '#0AA1DD', '#0AA1DD',
  '#0AA1DD', '#0AA1DD', '#0AA1DD',
]
export const TEXT = '#ffffff'

export function Waiting({ children }) {
  return <Text>
    <Text color={ACCENT}><Spinner type='dots3'/></Text> {children}
  </Text>
}


export function Question({ children }) {
  const [timer, setTimer] = useState(0)
  const color = Q[timer % Q.length]

  useInterval(() => setTimer(timer + 1), 100)

  return <Text>
    <Text color={color}>▶</Text> {children}
  </Text>
}


export function Hint({ children }) {
  return <Text color={HINT}>{children}</Text>
}


export function Tertiary({ children }) {
  return <Text color={TERTIARY}>{children}</Text>
}


export function Success({ children }) {
  return <Text>
    <Text color={SUCCESS}>✔</Text> {children}
  </Text>
}


export function Error({ children }) {
  return <Text>
    <Text color={ERROR}>✘ {children}</Text>
  </Text>
}


export function Warning({ children }) {
  return <Text>
    <Text color={WARNING}>⚠ {children}</Text>
  </Text>
}


export function Highlight({ children }) {
  return <Text bold color={PRIMARY}>{children}</Text>
}


export function Accent({ children }) {
  return <Text bold color={ACCENT}>{children}</Text>
}


export function Fade({ children }) {
  return <Text color={FADE}>{children}</Text>
}
