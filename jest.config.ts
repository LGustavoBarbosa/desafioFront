import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^core/(.*)$": "<rootDir>/src/core/$1",
    "^domain/(.*)$": "<rootDir>/src/domain/$1",
    "^providers/(.*)$": "<rootDir>/src/providers/$1",
    "^views/(.*)$": "<rootDir>/src/views/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
