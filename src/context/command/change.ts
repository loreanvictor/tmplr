import { Command } from './base'


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


export abstract class Change extends Command {
  constructor(
    readonly log: ChangeLog,
  ) { super() }

  protected async _run() {
    this.log.commit({
      change: this,
      details: await this.commit()
    })
  }

  protected abstract commit(): Promise<ChangeDetails>
}
