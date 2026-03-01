/** @type {import('jest').Config} */
module.exports = {
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  testTimeout: 30000,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.aios-core/',
    '/tests/',
  ],
  collectCoverageFrom: [
    'bpr-project/src/**/*.js',
  ],
};
