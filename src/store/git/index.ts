import { createProvider } from '../base'
import { cached } from '../../util/cached'

import { remoteUrl, remoteDetails } from './remote'
import { initialCommit } from './commits'


const remoteDetailsCached = cached(remoteDetails)
const initialCommitCached = cached(initialCommit)

export default createProvider({
  'remote_url': cached(remoteUrl),
  'remote_provider': cached(async () => (await remoteDetailsCached()).resource),
  'remote_owner': cached(async () => (await remoteDetailsCached()).owner),
  'remote_name': cached(async () => (await remoteDetailsCached()).name),
  'author_name': cached(async () => (await initialCommitCached())!.author_name),
  'author_email': cached(async () => (await initialCommitCached())!.author_email),
})
