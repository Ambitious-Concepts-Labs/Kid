module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  coverageReporters: ["json", "lcov", "text", "html"],
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        publicPath: "coverage/lcov-report",
        filename: "unit-test.html",
        openReport: true,
      },
    ],
  ],
};
