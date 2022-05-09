import { parse as parseYaml } from 'yaml'

import { createContext } from '../context'
import { Command } from '../context/command'
import { parseExpr } from './command/expr'
import { parseCommand } from './command'


export function parse(obj: string | object): Command {
  if (typeof obj === 'string') {
    return parse(parseYaml(obj))
  } else {
    return parseCommand({
      ...createContext(),
      parseCommand,
      parseExpr,
    }, obj)
  }
}
