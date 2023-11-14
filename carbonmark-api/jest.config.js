/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", __dirname],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
