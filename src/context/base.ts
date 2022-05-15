import { Stack } from './stack'
import { ChangeLog } from './command'


export interface Context {
  stack: Stack
  changeLog: ChangeLog
}
