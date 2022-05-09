import { Scope } from './scope'
import { ChangeLog } from './command'


export interface Context {
    scope: Scope
    changeLog: ChangeLog
}
