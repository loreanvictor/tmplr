import git from './instance'


export async function initialCommit() {
  const hash = await git.raw('rev-list', '--max-parents=0', 'HEAD')
  const commits = await git.log(['-1', hash.trim()])

  return commits.latest
}
