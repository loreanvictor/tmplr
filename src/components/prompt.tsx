import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useToggle } from 'react-use'
import { Text, Newline, useInput } from 'ink'
import TextInput from 'ink-text-input'
import { PromptExecution, Deferred } from '@tmplr/core'

import { Question, Hint, TERTIARY, PRIMARY } from '../theme'


export interface PromptProps {
  prompt: PromptExecution
}

export function Prompt({ prompt }: PromptProps) {
  const [value, setValue] = useState('')
  const [touched, touch] = useToggle(false)
  const [msg, setMsg] = useState('loading ...')
  const value$ = useRef(new Deferred<string>())

  useEffect(() => {
    prompt.plug(() => ({
      setDefault: (v: string) => setValue(v),
      setMessage: (m: string) => setMsg(m),
      value: () => value$.current.promise,
      unplug: () => {},
    }))

    return () => prompt.unplug()
  }, [prompt])


  useInput((input) => {
    if (!touched && input[0]?.match(/\w/)) {
      setValue(input)
    }

    touch(true)
  })

  const submit = useCallback((input) => {
    if (value$.current) {
      value$.current.resolve(input)
    }
  }, [])

  return (
    <>
      <Question>{msg}</Question>
      <Text color={touched ? PRIMARY : TERTIARY}>
        <TextInput value={value} onChange={setValue} onSubmit={submit} />
      </Text>
      <Newline/>
      <Hint>Press {'<Enter>'} to continue</Hint>
    </>
  )
}

