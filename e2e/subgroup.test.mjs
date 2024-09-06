import { scenario } from './util.mjs'


scenario('subgroup', async (run, { $, ls }) => {
  await $`rm -f PLACEHOLDER`

  expect((await ls()).length).toBe(0)

  await run('gitlab:skewed-aspect/test-repos/tmplr-test', '--subgroup', '--skip-warnings')

  expect(await ls()).toIncludeAllMembers([ 'README.md', 'nested', 'baz.txt' ])
  expect(await ls('nested')).toIncludeAllMembers([ 'baz.txt', 'qux.txt' ])
})