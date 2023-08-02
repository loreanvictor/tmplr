import { join } from 'path'
import { cp, mkdtemp, rm, access, lstat, readFile } from 'fs/promises'
import { execa, $ } from 'execa'
import { getBinPath } from 'get-bin-path'


export function scenario(name, testFn) {
  test('scnario: ' + name, async () => {
    const fixture = join('e2e', 'fixtures', name)
    await access(fixture)
    const stat = await lstat(fixture)
    expect(stat.isDirectory()).toBe(true)

    const dir = await mkdtemp('test-')
    await cp(join('e2e', 'fixtures', name), dir, { recursive: true })
    const cmd = $({ cwd: dir })
    const bin = await getBinPath()
    const run = (...args) => execa(bin, args, { cwd: dir })

    try {
      await testFn(run, {
        dir,
        $: async (...args) => (await cmd(...args)).stdout,
        ls: async () => {
          const { stdout } = await cmd`ls`
          return stdout.split('\n')
        },
        read: async file => {
          return await readFile(join(dir, file), 'utf8')
        }
      })
    } finally {
      await rm(dir, { recursive: true })
    }
  })
}
