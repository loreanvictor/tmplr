import React from 'react'
import { Static } from 'ink'

import { ChangeLog, Copy, Remove, Update } from '../context/command'
import { Success, Highlight } from './theme'



export interface LogDisplayProps {
  log: ChangeLog
}

export function LogDisplay({ log } : LogDisplayProps) {
  return <Static items={log.entries()}>
    {(entry, i) => {
      if (entry.change instanceof Update) {
        return (
          <Success key={i}>
            Updated: <Highlight>{entry.details['target']}</Highlight>
          </Success>
        )
      } else if (entry.change instanceof Copy) {
        return (
          <Success key={i}>
            Copied: <Highlight>{entry.details['src']}</Highlight> {'->'} <Highlight>{entry.details['dest']}</Highlight>
          </Success>
        )
      } else if (entry.change instanceof Remove) {
        return (
          <Success key={i}>
            Removed: <Highlight>{entry.details['target']}</Highlight>
          </Success>
        )
      } else {
        return <></>
      }
    }}
  </Static>
}
