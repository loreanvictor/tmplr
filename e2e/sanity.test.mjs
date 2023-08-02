import { getBinPath } from 'get-bin-path'


describe('sanity checks', () => {
  test('runs e2e tests', () => {
    expect(true).toBe(true)
  })

  test('has a built binary', async () => {
    expect(await getBinPath()).toMatch(/dist\/.*\/index\.js$/)
  })
})
