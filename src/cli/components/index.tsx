import React from 'react'

import { useAsync } from 'react-use'

import { Copy, Read, Remove, Update, Degit, Run, Use, Exit, Version } from '../../context/command'
import { Choices, Prompt } from '../../context/expr'

import { Waiting, Error, Hint } from './theme'
import {
  ReadInfo, UpdateInfo, DegitInfo, CopyInfo, RemoveInfo, RunInfo,
  UseInfo, ExitLog, ShowVersion,
} from './command'
import { PromptDisplay, ChoicesDisplay } from './expr'
import { LogDisplay } from './log'
import { useActiveRunnable } from './hooks'
import { TraceDisplay } from './trace'
import { Execution } from '../../context'
import { ExitSignal } from '../../context/command/exit'


export interface ExecDisplayProps {
  exec: Execution
}

export function ExecDisplay({ exec }: ExecDisplayProps) {
  const [active] = useActiveRunnable(exec.command)
  const res = useAsync(() => exec.run())

  if (res.error && res.error instanceof ExitSignal && res.error.showLogs) {
    return <LogDisplay log={exec.context.changeLog} />
  } else if (res.error && !(res.error instanceof ExitSignal)) {
    return (
      <>
        <Error>{res.error.message.trim()}</Error>
        { active && <TraceDisplay active={active} /> }
      </>
    )
  } else if (active instanceof Read) {
    return <ReadInfo read={active} />
  } else if (active instanceof Update) {
    return <UpdateInfo update={active} />
  } else if (active instanceof Copy) {
    return <CopyInfo copy={active} />
  } else if (active instanceof Remove) {
    return <RemoveInfo remove={active} />
  } else if (active instanceof Prompt) {
    return <PromptDisplay prompt={active} />
  } else if (active instanceof Choices) {
    return <ChoicesDisplay choices={active} />
  } else if (active instanceof Degit) {
    return <DegitInfo degit={active} />
  } else if (active instanceof Run) {
    return <RunInfo run={active} />
  } else if (active instanceof Use) {
    return <UseInfo use={active} />
  } else if (active instanceof Exit) {
    return <ExitLog exit={active} />
  } else if (active instanceof Version) {
    return <ShowVersion version={active}/>
  } else if (res.loading) {
    return <Waiting>Working ... <Hint>{active?.constructor.name}</Hint></Waiting>
  } else {
    return <LogDisplay log={exec.context.changeLog} />
  }
}


export * from './help'
export * from './version'
export * from './exec'

// TODO: all other components should be either deprecated or refactored
//       to work with @tmplr/core
