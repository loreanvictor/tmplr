import React from 'react'
import { ComponentSet } from '@tmplr/react'
import { ChoicesExecution, PromptExecution } from '@tmplr/core'
import { LocatedError } from '@tmplr/yaml-parser'

import { Error, Waiting } from '../theme'
import { Log } from './log'
import { Prompt } from './prompt'
import { Choices } from './choices'
import { Trace } from './trace'


export const COMPONENTS: ComponentSet = {
  Logger: ({ changeLog }) => <Log log={changeLog} />,
  Error: ({ error, message }) => {
    if (error instanceof LocatedError) {
      return <Trace error={error} />
    } else {
      return <Error>{message}</Error>
    }
  },
  Waiting: () => <Waiting>Working ...</Waiting>,
  route: (exec) => {
    if (exec instanceof PromptExecution) {
      return () => <Prompt prompt={exec}/>
    } else if (exec instanceof ChoicesExecution) {
      return () => <Choices choices={exec}/>
    }

    return undefined
  },
}
