import React from 'react'

import { useArgs } from './args'
import { Help } from './help'
import { Version } from './version'
import { Preview } from './preview'
import { Clean } from './clean'
import { RunLocal } from './local'
import { Template } from './template'
import { Use } from './use'


export function App() {
  const args = useArgs()

  if (args.flags.help || args.command === 'help') {
    return <Help />
  } else if (args.flags.version || args.command === 'version') {
    return <Version />
  } else if (args.command === 'preview' || args.command === 'preview:use') {
    return <Preview workdir={args.workdir} use={args.command === 'preview:use'} />
  } else if (args.command === 'clean') {
    return <Clean workdir={args.workdir} />
  } else if (args.command === 'use') {
    return <Use workdir={args.workdir} target={args.target} />
  } else if (args.target) {
    return <Template workdir={args.workdir} target={args.target} />
  } else {
    return <RunLocal workdir={args.workdir} />
  }
}
