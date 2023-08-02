export default {
  // preset: 'ts-jest',
  verbose: true,
  clearMocks: true,
  projects: [
    {
      displayName: 'unit tests',
      preset: 'ts-jest',
      testMatch: ['**/test/**/*.test.?(m)[jt]s?(x)'],
    },
    {
      displayName: 'integration tests',
      testMatch: ['**/e2e/**/*.test.mjs'],
      transform: {},
    }
  ],
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
  ],
}
