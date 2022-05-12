import React from 'react'

import { useAsync } from 'react-use'

import { Choices, Prompt, Read, Update } from '../context/command'

import { Waiting, Error } from './theme'
import { ReadInfo, UpdateInfo } from './command'
import { LogDisplay } from './log'
import { useActiveRunnable } from './hooks'
import { Execution } from '../parse'
import { PromptDisplay } from './command/expr/prompt'
import { ChoicesDisplay } from './command/expr/choices'


export interface ExecDisplayProps {
  exec: Execution
}

export function ExecDisplay({ exec }: ExecDisplayProps) {
  const active = useActiveRunnable(exec.command)
  const res = useAsync(() => exec.command.run())

  if (active instanceof Read) {
    return <ReadInfo read={active} />
  } else if (active instanceof Update) {
    return <UpdateInfo update={active} />
  } else if (active instanceof Prompt) {
    return <PromptDisplay prompt={active} />
  } else if (active instanceof Choices) {
    return <ChoicesDisplay choices={active} />
  } else if (active) {
    return <Waiting>Waiting on {active.constructor.name}</Waiting>
  } else if (res.error) {
    return <Error>{res.error.message}</Error>
  } else {
    return <LogDisplay log={exec.context.changeLog} />
  }
}
