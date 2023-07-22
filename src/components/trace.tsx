import React, { useMemo } from 'react'
import { join, relative } from 'path'
import { Transform, Text, Newline } from 'ink'
import chalk from 'chalk'
import { LocatedError } from '@tmplr/yaml-parser'
import { Location, Position, Range } from 'mapped-file'
import { highlight } from 'cli-highlight'

import { BGERROR, Error, FADE, HINT, PRIMARY } from '../theme'
import { useWorkDir } from '../workdir'


export function TracePos({ pos }: { pos: Position }) {
  return <>{pos.line + 1}:{pos.character + 1}</>
}


export function TraceRange({ range }: { range: Range }) {
  return <>
    <TracePos pos={range.start} />-<TracePos pos={range.end} />
  </>
}


export function TraceLocation({ location }: { location: Location }) {
  const workdir = useWorkDir()
  const path = join(relative(process.cwd(), workdir), location.file.name)

  return <Text>
    👉 <Text color={FADE}>{path}</Text>
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


function Highlight({ code }) {
  const highlighted = useMemo(() => highlight(code, { language: 'yaml' }), [code])

  return <Text>{highlighted}</Text>
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
            <Highlight code={line.content} /> :
            <Transform transform={chalk.bgHex(BGERROR)}>
              <Highlight code={line.content} />
            </Transform>
        }
      </Text>
    })}
    <Newline/>
  </>
}
