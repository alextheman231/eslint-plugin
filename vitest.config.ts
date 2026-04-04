import type { UserProjectConfigExport } from "vitest/config";

const config: UserProjectConfigExport = {
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    globals: true,
    include: ["**/tests/**/*.test.ts"],
  },
};

export default config;
