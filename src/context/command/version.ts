import execa from 'execa'
import semver from 'semver'

import { version } from '../../../package.json'
import { IO, Prep } from '../io'
import { IOAwareCommand } from './io'
import { ExitSignal } from './exit'
import { Deferred } from '../util/deferred'


export interface VersionIO extends IO {
  setCurrent(msg: string): void
  setLatest(msg: string): void

  loading(): void
  updateRequired(): void
  upToDate(): void
}


export class Version extends IOAwareCommand<VersionIO> {
  constructor() { super() }

  async onConnect(io: VersionIO, _: Prep, deferred: Deferred<void>) {
    io.loading()
    io.setCurrent(version)

    const latest = (await execa.command('npm show tmplr version')).stdout
    io.setLatest(latest)

    if (semver.gt(latest, version)) {
      io.updateRequired()
    } else {
      io.upToDate()
    }

    deferred.reject(new ExitSignal(false))
  }
}
