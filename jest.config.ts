import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/{lib,hooks,components,app}/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/components/ui/**",
  ],
  coverageReporters: ["lcov", "text-summary", "json-summary"],
};

const nextJestConfig = createJestConfig(config);

const jestConfig = async () => ({
  ...(await nextJestConfig()),
  transformIgnorePatterns: [
    "/node_modules/(?!\\.pnpm/[^/]+/node_modules/(next-intl|use-intl|@formatjs|intl-messageformat)/|(next-intl|use-intl|@formatjs|intl-messageformat)/)",
  ],
});

export default jestConfig;
