module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  setupFilesAfterEnv: ["<rootDir>/test/setupTest.ts"],
  testMatch: ["**/test/**/*.test.ts", "**/test/**/*.spec.ts"]
};
