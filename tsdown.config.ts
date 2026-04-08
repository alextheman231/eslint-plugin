import type { UserConfig } from "tsdown";
import packageInfo from "./package.json" with { type: "json" };

const config: Array<UserConfig> = [
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    deps: {
      neverBundle: [...Object.keys(packageInfo.peerDependencies), "@typescript-eslint/utils"],
      onlyBundle: false,
    },
    fixedExtension: false,
    outputOptions: {
      exports: "named",
    },
  },
  {
    entry: ["src/utility/public/index.ts"],
    outDir: "dist/utility",
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    deps: {
      neverBundle: [...Object.keys(packageInfo.peerDependencies), "@typescript-eslint/utils"],
      onlyBundle: false,
    },
    fixedExtension: false,
    outputOptions: {
      exports: "named",
    },
  },
  {
    entry: ["src/internal/index.ts"],
    outDir: "dist/internal",
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    deps: {
      neverBundle: [...Object.keys(packageInfo.peerDependencies), "@typescript-eslint/utils"],
      onlyBundle: false,
    },
    fixedExtension: false,
    outputOptions: {
      exports: "named",
    },
  },
];

export default config;
