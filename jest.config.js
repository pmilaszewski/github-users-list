module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    // '\\.svg': '<rootDir>/__mocks__/svgMock.ts',
    '@/(.*)': '<rootDir>/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFiles: ['./jest/setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
}
