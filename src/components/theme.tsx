import React from 'react'
import { Text } from 'ink'
import Spinner from 'ink-spinner'


const PRIMARY = '#F1DDBF'
const SUCCESS = '#97DBAE'
const ERROR = '#F24A72'

export function Waiting({ children }) {
  return <Text>
    <Text color={PRIMARY}><Spinner/></Text> {children}
  </Text>
}


export function Success({ children }) {
  return <Text>
    <Text color={SUCCESS}>✔</Text> {children}
  </Text>
}


export function Error({ children }) {
  return <Text>
    <Text color={ERROR}>✘</Text> {children}
  </Text>
}


export function Highlight({ children }) {
  return <Text bold color={PRIMARY}>{children}</Text>
}
