import React from 'react'
import { Static } from 'ink'
import { relative } from 'path'

import serialize from '../serialize'
import { ChangeLog, Copy, Degit, Remove, Update } from '../context/command'
import { Success, Highlight, Tertiary } from './theme'


const _ = (path: string) => relative(process.cwd(), path) || '.'


export interface LogDisplayProps {
  log: ChangeLog
}

export function LogDisplay({ log } : LogDisplayProps) {
  return <Static items={log.entries()}>
    {(entry, i) => {
      if (entry.change instanceof Update) {
        return (
          <Success key={i}>
            Updated: <Highlight>{_(entry.details['target']!)}</Highlight>
          </Success>
        )
      } else if (entry.change instanceof Copy) {
        return (
          <Success key={i}>
            Copied: <Highlight>{_(entry.details['src']!)}</Highlight>
            <Tertiary>{' -> '}</Tertiary>
            <Highlight>{_(entry.details['dest']!)}</Highlight>
          </Success>
        )
      } else if (entry.change instanceof Remove) {
        return (
          <Success key={i}>
            Removed: <Highlight>{_(entry.details['target']!)}</Highlight>
          </Success>
        )
      } else if (entry.change instanceof Degit) {
        return (
          <Success key={i}>
            Cloned: <Highlight>{entry.details['src']}</Highlight>
            <Tertiary>{' -> '}</Tertiary>
            <Highlight>{_(entry.details['dest']!)}</Highlight>
          </Success>
        )
      } else {
        return (
          <Success key={i}>
            {serialize(entry.change)}
          </Success>
        )
      }
    }}
  </Static>
}
