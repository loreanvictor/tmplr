import { readdir } from 'fs/promises'
import { basename } from 'path'

import { cached } from '../util/cached'
import { createProvider } from '../base'


export default createProvider({
  'rootdir': cached(async () => basename(process.cwd())),
  'rootempty': cached(async () => {
    const files = await readdir(process.cwd())

    if (files.filter(file => file !== '.git' && file !== '.tmplr.yml').length === 0) {
      return 'yes'
    } else {
      return ''
    }
  }),
})
