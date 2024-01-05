import { scenario } from './util.mjs'


scenario('local', async (run, { ls, read }) => {
  await run('local:../template')
  expect(await ls()).toIncludeSameMembers([ '.tmplr.yml', 'halo.txt' ])
  expect(await read('halo.txt')).toBe('Halo World!')
}, {
  root: 'target',
  skipCI: true,
})


scenario('local-use', async (run, { ls, read }) => {
  await run('use', 'local:./recipe')
  expect(await ls()).toIncludeSameMembers([ 'halo.txt', 'recipe' ])
  expect(await read('halo.txt')).toBe('Halo World!')
})
