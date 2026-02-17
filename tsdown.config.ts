import { defineConfig } from "tsdown";
import packageInfo from "./package.json" with { type: "json" };

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    external: [...Object.keys(packageInfo.peerDependencies), "@typescript-eslint/utils"],
    fixedExtension: false,
    outputOptions: {
      exports: "named",
    },
    inlineOnly: false,
  },
  {
    entry: ["src/utility/public/index.ts"],
    outDir: "dist/utility",
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    external: [...Object.keys(packageInfo.peerDependencies), "@typescript-eslint/utils"],
    fixedExtension: false,
    outputOptions: {
      exports: "named",
    },
    inlineOnly: false,
  },
  {
    entry: ["src/internal/index.ts"],
    outDir: "dist/internal",
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    external: [...Object.keys(packageInfo.peerDependencies), "@typescript-eslint/utils"],
    fixedExtension: false,
    outputOptions: {
      exports: "named",
    },
    inlineOnly: false,
  },
]);
