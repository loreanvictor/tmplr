import { scenario } from './util.mjs'


scenario('readwrite', async (run, { ls, read }) => {
  await run()

  expect(await ls()).toIncludeSameMembers([
    'derp.txt',
    'ffs.txt',
    'out.json',
    'package-template.json',
    '.tmplr.yml',
  ])

  expect(await read('derp.txt')).toBe('bloop-blorp')
  expect(await read('ffs.txt')).toBe('bloop-blorp')
  expect(await read('out.json')).toMatch(/\"name\": \"bloop-blorp\"/)
})
