import { cached } from '../util/cached'
import { Provider } from '../base'


const EnvProvider: Provider = {
  has(key: string) {
    return !!process.env[key]
  },

  get: (key: string) => cached(async () => process.env[key] as string),
}


export default EnvProvider
