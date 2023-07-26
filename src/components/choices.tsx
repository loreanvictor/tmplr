import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { Text, Newline } from 'ink'
import SelectInput, { ItemProps, IndicatorProps } from 'ink-select-input'
import { ChoicesExecution, Deferred } from '@tmplr/core'

import { Question, Highlight, Hint, Tertiary, FADE } from '../theme'
import TextInput from 'ink-text-input'


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


const MAX_DISPLAY = 7


export function Choices({ choices }: ChoicesProps) {
  const [msg, setMsg] = useState('loading ...')
  const [items, setItems] = useState<string[]>([])
  const [filter, setFilter] = useState('')
  const value$ = useRef(new Deferred<number>())

  const overflow = items.length > MAX_DISPLAY
  const mapped = useMemo(() => items.map((label, index) => ({ label, value: index, key: `${index}` })), [items])
  const filtered = useMemo(
    () => mapped.filter(({ label }) => label.toLowerCase().includes(filter.toLowerCase())),
    [mapped, filter]
  )
  const paginate = filtered.length > MAX_DISPLAY
  const empty = filtered.length === 0

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
    if (item && value$.current) {
      value$.current.resolve(item.value)
    }
  }, [])

  return (
    <>
      <Question>{msg}</Question>
      { overflow && <Newline/> }
      { overflow &&
        <Text color={FADE}> 🔎 {''}
          <TextInput showCursor={false} value={filter}
            onChange={setFilter} placeholder='Search...' />
        </Text>
      }
      { overflow && <Hint> { paginate ? '▲' : ' ' } </Hint> }
      { empty && <Hint> ❌ No matches found. </Hint>}
      <SelectInput
        itemComponent={Item}
        limit={MAX_DISPLAY}
        indicatorComponent={Indicator}
        items={filtered}
        onSelect={submit} />
      { overflow && <Hint> { paginate ? '▼' : ' ' } </Hint> }
      <Newline/>
      <Hint>Use {'<Up>'} and {'<Down>'} keys to navigate, {'<Enter>'} to select.</Hint>
    </>
  )
}
