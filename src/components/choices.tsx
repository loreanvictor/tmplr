import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Text, Newline } from 'ink'
import SelectInput, { ItemProps, IndicatorProps } from 'ink-select-input'
import { ChoicesExecution, Deferred } from '@tmplr/core'

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


export interface ChoicesProps {
  choices: ChoicesExecution
}


export function Choices({ choices }: ChoicesProps) {
  const [msg, setMsg] = useState('loading ...')
  const [items, setItems] = useState<string[]>([])
  const value$ = useRef(new Deferred<number>())

  useEffect(() => {
    choices.plug(() => ({
      setMessage: v => setMsg(v),
      setChoices: i => setItems(i),
      pick: () => value$.current.promise,
      unplug: () => {}
    }))

    return () => choices.unplug()
  }, [choices])

  const submit = useCallback((item) => {
    if (value$.current) {
      value$.current.resolve(item.value)
    }
  }, [])

  return (
    <>
      <Question>{msg}</Question>
      <SelectInput
        itemComponent={Item}
        indicatorComponent={Indicator}
        items={items.map((label, index) => ({ label, value: index, key: `${index}` }))}
        onSelect={submit} />
      <Newline/>
      <Hint>Use {'<Up>'} and {'<Down>'} keys to navigate, {'<Enter>'} to select.</Hint>
    </>
  )
}

