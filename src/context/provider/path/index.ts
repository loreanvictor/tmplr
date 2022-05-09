import { basename } from 'path'

import { cached } from '../util/cached'
import { createProvider } from '../base'


export default createProvider({
  'dirname': cached(async () => basename(process.cwd()))
})
