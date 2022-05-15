import React from 'react'

import { useAsync } from 'react-use'

import { Choices, Copy, Prompt, Read, Remove, Update, Degit } from '../context/command'

import { Waiting, Error, Hint } from './theme'
import { ReadInfo, UpdateInfo, DegitInfo, CopyInfo, RemoveInfo } from './command'
import { PromptDisplay, ChoicesDisplay } from './expr'
import { LogDisplay } from './log'
import { useActiveRunnable } from './hooks'
import { Execution } from '../parse'
import { TraceDisplay } from './trace'


export interface ExecDisplayProps {
  exec: Execution
}

export function ExecDisplay({ exec }: ExecDisplayProps) {
  const active = useActiveRunnable(exec.command)
  const res = useAsync(() => exec.run())

  if (res.error) {
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
  } else if (res.loading) {
    return <Waiting>Working ... <Hint>{active?.constructor.name}</Hint></Waiting>
  } else {
    return <LogDisplay log={exec.context.changeLog} />
  }
}
