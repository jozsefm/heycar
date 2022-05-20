import type { InitialOptionsTsJest } from 'ts-jest/dist/types'

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/mocks/styleMock.js',
  },
}

export default config
