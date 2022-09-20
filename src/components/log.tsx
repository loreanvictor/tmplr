import React from 'react'
import { Static } from 'ink'
import { relative, join } from 'path'
import { ChangeLog, CopyExecution, DegitExecution, RemoveExecution, UpdateExecution } from '@tmplr/core'

import { Success, Highlight, Tertiary } from '../theme'


const _ = (workdir: string, path: string) => join(relative(process.cwd(), workdir),  path)

export interface LogProps {
  log: ChangeLog
}

export function Log({ log } : LogProps) {
  return <Static items={log.entries()}>
    {(entry, i) => {
      if (entry.change instanceof UpdateExecution) {
        return (
          <Success key={i}>
            Updated: <Highlight>{_(entry.change.filesystem.root, entry.details['target']!)}</Highlight>
          </Success>
        )
      } else if (entry.change instanceof CopyExecution) {
        return (
          <Success key={i}>
            Copied: <Highlight>{_(entry.change.filesystem.root, entry.details['source']!)}</Highlight>
            <Tertiary>{' -> '}</Tertiary>
            <Highlight>{_(entry.change.filesystem.root, entry.details['dest']!)}</Highlight>
          </Success>
        )
      } else if (entry.change instanceof RemoveExecution) {
        return (
          <Success key={i}>
            Removed: <Highlight>{_(entry.change.filesystem.root, entry.details['target']!)}</Highlight>
          </Success>
        )
      } else if (entry.change instanceof DegitExecution) {
        return (
          <Success key={i}>
            Cloned: <Highlight>{entry.details['source']}</Highlight>
            <Tertiary>{' -> '}</Tertiary>
            <Highlight>{_(entry.change.filesystem.root, entry.details['target']!)}</Highlight>
          </Success>
        )
      } else {
        return <></>
      }
    }}
  </Static>
}
