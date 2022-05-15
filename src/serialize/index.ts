import { stringify } from 'yaml'

import { Runnable } from '../context'
import serializeJSON from './json'


export default (runnable: Runnable) => {
  return stringify(serializeJSON(runnable))
}
