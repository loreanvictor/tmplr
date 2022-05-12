import React, { useEffect, useState, useCallback } from 'react'
import SelectInput from 'ink-select-input'
import { Choices, Choice } from '../../../context/command'
import { Question } from '../../theme'


export interface ChoicesDisplayProps {
  choices: Choices
}

export function ChoicesDisplay({ choices }: ChoicesDisplayProps) {
  const [msg, setMsg] = useState('loading ...')
  const [items, setItems] = useState<Choice[]>([])
  const [cb, setCb] = useState<{ callback: (choice: Choice) => void }>()

  useEffect(() => {
    choices.plug(() => ({
      setMessage: v => setMsg(v),
      setChoices: i => setItems(i),
      onSelect: (c: (_: Choice) => void) => setCb({ callback: c }),
    }))
  }, [choices])

  const submit = useCallback((choice: Choice) => {
    if (cb?.callback) {
      cb.callback(choice)
    }
  }, [cb])

  return (
    <>
      <Question>{msg}</Question>
      <SelectInput items={items.map(({ label, value }) => ({ label, value, key: label }))} onSelect={submit} />
    </>
  )
}
