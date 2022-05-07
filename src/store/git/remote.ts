import parse from 'git-url-parse'
import git from './instance'


export async function remoteUrl() {
  const url = await git.remote(['get-url', 'origin'])

  return (url as string).trim()
}


export async function remoteDetails() {
  const url = await remoteUrl()

  return parse(url)
}
