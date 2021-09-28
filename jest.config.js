module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['jest-canvas-mock'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ["<rootDir>/src"],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": 'babel-jest',
  },
  moduleNameMapper: {
    '^@Data$': '<rootDir>/src/data/',
    '^@Maps$': '<rootDir>/src/maps/',
    '^@Objects$': '<rootDir>/src/objects/',
    '^@Tileset$': '<rootDir>/src/tileset/',
    '^@Scenes$': '<rootDir>/src/scenes/',
    '^@Utilities$': '<rootDir>/src/utilities/',
  },
  transformIgnorePatterns: [
    '!node_modules/'
  ]
};
