import { Command } from './base'


export interface ChangeLog {
  commit(change: Change)
  entries(): Change[]
}


export function createChangeLog(): ChangeLog {
  const logs: Change[] = []

  return {
    entries() { return logs },
    commit(change: Change) { logs.push(change) }
  }
}


export abstract class Change extends Command {
  constructor(
    readonly log: ChangeLog,
  ) { super() }

  protected async _run() {
    await this.commit()
    this.log.commit(this)
  }

  protected abstract commit(): Promise<void>
}
