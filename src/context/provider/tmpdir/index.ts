import { mkdtemp, rm } from 'fs/promises'

import { Provider } from '../base'
import { cached, CachedFunction } from '../util/cached'


const _Map: {[key: string]: CachedFunction<string>} = {}

const provider: Provider = {
  has: (_: string) => true,
  get: (key: string) => {
    if (!(key in _Map)) {
      _Map[key] = cached(() => mkdtemp(`${key}-`))
    }

    return _Map[key]!
  },

  async cleanup() {
    for (const key in _Map) {
      const dir = await _Map[key]!()
      await rm(dir, { recursive: true, force: true })
    }
  }
}


export default provider
