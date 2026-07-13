export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^styled-system/jsx$': '<rootDir>/src/test/mocks/styled-system-jsx.tsx',
    '^lucide-react/dynamic$': '<rootDir>/src/test/mocks/lucide-dynamic.tsx',
    '^styled-system/(.*)$': '<rootDir>/styled-system/$1',
  },
};
