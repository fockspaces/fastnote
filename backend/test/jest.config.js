module.exports = {
  collectCoverage: true, // Enables coverage collection
  collectCoverageFrom: [
    "controllers/**/*.js",
    "routes/**/*.js",
    "models/**/*.js",
    "services/**/*.js",
    "utils/**/*.js",
    "!**/node_modules/**",
    "!**/test/**",
  ],
  coverageReporters: ["text", "lcov"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  maxConcurrency: 1,
};
