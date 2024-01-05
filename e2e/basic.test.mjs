import { capitalCase, snakeCase } from 'change-case'

import { scenario } from './util.mjs'


scenario('basic', async (run, { $, ls, read, dir }) => {
  await run()

  const files = await ls()
  expect(files).toContain('package.json')
  expect(files).toContain('README.md')
  expect(files).toContain('LICENSE')
  expect(files.length).toBe(3)

  const pkg = JSON.parse(await read('package.json'))
  expect(pkg.name).toBe(dir)
  expect(pkg.repository.url).toBe(await $`git remote get-url origin`)

  const README = await read('README.md')
  expect(README).toMatch(new RegExp(`# ${capitalCase(dir)}`))
  expect(README).toMatch(new RegExp(`npm install ${dir}`))
  expect(README).toMatch(new RegExp(`import \\{ ${snakeCase(dir)} \\} from '${dir}'`))
})
