/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: [
    '**/?(*.)+(spec|test).ts',
  ],
};
