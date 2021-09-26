module.exports = {
  preset: 'ts-jest',
  // setupFiles: ['jest-canvas-mock'],
  moduleDirectories: ['src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    '^@Data$': '<rootDir>/src/data/',
    '^@Maps$': '<rootDir>/src/maps/',
    '^@Objects$': '<rootDir>/src/objects/',
    '^@Tileset$': '<rootDir>/src/tileset/',
    '^@Scenes$': '<rootDir>/src/scenes/',
    '^@Utilities$': '<rootDir>/src/utilities/',
  }
};
