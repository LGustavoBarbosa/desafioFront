export default {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    setupFilesAfterEnv: ['@testing-library/jest-dom']
  }
  