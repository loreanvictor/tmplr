import { basename } from 'path'

import { cached } from '../util/cached'
import { createProvider } from '../base'


export default createProvider({
  'rootdir': cached(async () => basename(process.cwd()))
})
