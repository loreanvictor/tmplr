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
      if (entry instanceof Update) {
        return (
          <Success key={i}>
            Updated: <Highlight>{entry.target}</Highlight>
          </Success>
        )
      } else if (entry instanceof Copy) {
        return (
          <Success key={i}>
            Copied: <Highlight>{entry.src}</Highlight> {'->'} <Highlight>{entry.dest}</Highlight>
          </Success>
        )
      } else if (entry instanceof Remove) {
        return (
          <Success key={i}>
            Removed: <Highlight>{entry.target}</Highlight>
          </Success>
        )
      } else {
        return <></>
      }
    }}
  </Static>
}
