import { getBinPath } from 'get-bin-path'


describe('sanity checks', () => {
  test('runs e2e tests', () => {
    expect(true).toBe(true)
  })

  test('has a built binary', async () => {
    const path = await getBinPath()
    const binPath = path.startsWith('\\\\?\\') ? path : path.replace(/\\/g, '/')
    expect(binPath).toMatch(/dist\/.*\/index\.js$/)
  })
})
