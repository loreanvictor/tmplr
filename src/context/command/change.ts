import { Rooted } from './rooted'


export interface ChangeDetails {
  [key: string]: string
}


export interface ChangeLogEntry {
  change: Change
  details: ChangeDetails
}


export interface ChangeLog {
  commit(entry: ChangeLogEntry)
  entries(): ChangeLogEntry[]
}


export function createChangeLog(): ChangeLog {
  const logs: ChangeLogEntry[] = []

  return {
    entries() { return logs },
    commit(entry: ChangeLogEntry) { logs.push(entry) }
  }
}


export abstract class Change extends Rooted {
  constructor(
    root: string,
    readonly log: ChangeLog,
  ) { super(root) }

  protected async _run() {
    this.log.commit({
      change: this,
      details: await this.commit()
    })
  }

  protected abstract commit(): Promise<ChangeDetails>
}


export const NULL_LOG: ChangeLog = {
  commit: () => { throw new Error('Cannot commit to a null log') },
  entries: () => []
}
