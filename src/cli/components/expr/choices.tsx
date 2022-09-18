import React, { useEffect, useState, useCallback } from 'react'
import { Text, Newline } from 'ink'
import SelectInput, { ItemProps, IndicatorProps } from 'ink-select-input'

import { Choices, Choice } from '../../../context/expr'
import { Question, Highlight, Hint, Tertiary } from '../theme'



function Item({ label, isSelected }: ItemProps) {
  if (isSelected) {
    return <Highlight>{label}</Highlight>
  } else {
    return <Text>{label}</Text>
  }
}


function Indicator({ isSelected }: IndicatorProps) {
  if (isSelected) {
    return <Tertiary> ⦿ </Tertiary>
  } else {
    return <Hint> ○ </Hint>
  }
}


export interface ChoicesDisplayProps {
  choices: Choices
}


export function ChoicesDisplay({ choices }: ChoicesDisplayProps) {
  const [msg, setMsg] = useState('loading ...')
  const [items, setItems] = useState<Choice[]>([])
  const [cb, setCb] = useState<{ callback?: (choice: Choice) => void }>()

  useEffect(() => {
    choices.interface.plug(() => ({
      setMessage: v => setMsg(v),
      setChoices: i => setItems(i),
      onSelect: (c: (_: Choice) => void) => setCb({ callback: c }),
      disconnect: () => setCb({ })
    }))

    return () => {
      setCb({ })
      choices.interface.unplug()
    }
  }, [choices])

  const submit = useCallback((choice: Choice) => {
    if (cb?.callback) {
      cb.callback(choice)
    }
  }, [cb])

  return (
    <>
      <Question>{msg}</Question>
      <SelectInput
        itemComponent={Item}
        indicatorComponent={Indicator}
        items={items.map(({ label, value }) => ({ label, value, key: label }))}
        onSelect={submit} />
      <Newline/>
      <Hint>Use {'<Up>'} and {'<Down>'} keys to navigate, {'<Enter>'} to select.</Hint>
    </>
  )
}


// TODO: rewrite this to work with @tmplr/core
