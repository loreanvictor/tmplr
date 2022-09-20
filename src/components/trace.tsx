import React, { useMemo } from 'react'
import { Transform, Text, Newline } from 'ink'
import chalk from 'chalk'
import SyntaxHihglight from 'ink-syntax-highlight'
import { LocatedError } from '@tmplr/yaml-parser'
import { Location, Position, Range } from 'mapped-file'

import { BGERROR, Error, FADE, HINT, PRIMARY } from '../theme'


export function TracePos({ pos }: { pos: Position }) {
  return <>{pos.line + 1}:{pos.character + 1}</>
}


export function TraceRange({ range }: { range: Range }) {
  return <>
    <TracePos pos={range.start} />-<TracePos pos={range.end} />
  </>
}


export function TraceLocation({ location }: { location: Location }) {
  return <Text>
    👉 <Text color={FADE}>{location.file.name}</Text>
    <Text color={PRIMARY}>:<TracePos pos={location.range.start} /></Text>
  </Text>
}


export interface TraceProps {
  error: LocatedError
}


function LineIndex({ index, surround }) {
  const str = `${parseInt(index) + 1}`
  const padded = str.padEnd(4 - str.length) + '|'

  return surround ?
    <Text color={HINT}>{padded}</Text> :
    <Text color={PRIMARY}>{chalk.bgHex(BGERROR)(padded)}</Text>
}


export function Trace({ error }: TraceProps) {
  const lines = useMemo(() => error.location.file.range(error.location.range, {
    surrounding: 2,
  }), [error])

  return <>
    <Error>Error: {error.message}</Error>
    <Newline/>
    <TraceLocation location={error.location} />
    {Object.entries(lines).map(([index, line]) => {
      return <Text key={index}>
        <LineIndex index={index} surround={line.surround}/>
        {
          line.surround ?
            <SyntaxHihglight language="yaml" code={line.content} /> :
            <Transform transform={chalk.bgHex(BGERROR)}>
              <SyntaxHihglight language="yaml" code={line.content} />
            </Transform>
        }
      </Text>
    })}
    <Newline/>
  </>
}
