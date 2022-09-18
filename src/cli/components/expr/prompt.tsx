import React, { useState, useEffect, useCallback } from 'react'
import { useToggle } from 'react-use'
import { Text, Newline, useInput } from 'ink'
import TextInput from 'ink-text-input'

import { Prompt } from '../../../context/expr'
import { Question, Hint, TERTIARY, PRIMARY } from '../theme'


export interface PromptDisplayProps {
  prompt: Prompt
}

export function PromptDisplay({ prompt }: PromptDisplayProps) {
  const [value, setValue] = useState('')
  const [touched, touch] = useToggle(false)
  const [msg, setMsg] = useState('loading ...')
  const [cb, setCb] = useState<{ callback?: (val: string) => void }>()

  useEffect(() => {
    prompt.interface.plug(() => ({
      setDefault: (v: string) => setValue(v),
      setMessage: (m: string) => setMsg(m),
      onValue: (c: (v: string) => void) => setCb({ callback: c }),
      disconnect: () => setCb({ }),
    }))

    return () => prompt.interface.unplug()
  }, [prompt])


  useInput((input) => {
    if (!touched && input[0]?.match(/\w/)) {
      setValue(input)
    }

    touch(true)
  })

  const submit = useCallback((input) => {
    if (cb?.callback) {
      cb.callback(input)
    }
  }, [cb])

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

// TODO: rewrite this to work with @tmplr/core
