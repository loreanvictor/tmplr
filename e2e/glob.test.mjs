import { scenario } from './util.mjs'


scenario('glob', async (run, { ls, read }) => {
  await run()

  expect(await ls()).toIncludeSameMembers([
    'src-a',
    'src-c',
    'dest-a',
    'dest-b',
    '.tmplr.yml'
  ])

  expect(await ls('src-a')).toIncludeSameMembers([
    '.hidden',
    '.hidden.js',
    'some.ts'
  ])

  expect(await ls('src-a/.hidden')).toIncludeSameMembers([
    'index.js',
    'other.ts'
  ])

  expect(await ls('src-c')).toIncludeSameMembers([
    '.hidden',
    'some.ts'
  ])

  expect(await ls('src-c/.hidden')).toEqual(['other.ts'])

  expect(await ls('dest-a')).toEqual(['visible.js'])

  expect(await ls('dest-b')).toIncludeSameMembers([
    '.hidden',
    '.hidden.js',
    'visible.js'
  ])

  expect(await ls('dest-b/.hidden')).toEqual(['index.js'])

  expect(await read('src-a/some.ts')).toMatch(/some james/)
  expect(await read('src-c/some.ts')).toMatch(/some james/)
  expect(await read('src-a/.hidden/other.ts')).toMatch(/some other \{\{ tmplr.token \}\}/)
  expect(await read('src-c/.hidden/other.ts')).toMatch(/some other james/)
})