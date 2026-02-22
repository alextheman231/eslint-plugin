import type { PackageManager } from "@alextheman/utility/internal";

import { normaliseIndents, omitProperties, parseBoolean } from "@alextheman/utility";
import {
  getPackageJsonContents,
  getPackageJsonPath,
  ModuleType,
  packageJsonNotFoundError,
  setupPackageEndToEnd,
} from "@alextheman/utility/internal";
import { execa } from "execa";
import { temporaryDirectoryTask } from "tempy";
import { beforeAll, describe as describeVitest, expect, test } from "vitest";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import tsConfig from "tsconfig.json" with { type: "json" };

beforeAll(async () => {
  await execa`pnpm run build`;
});

function getCodeString(moduleType: ModuleType, expectedStatus: "success" | "failure") {
  return `export const testString${moduleType === ModuleType.TYPESCRIPT ? ": string" : ""} = "${expectedStatus === "success" ? "I have standards, you'd better have some too!" : "I have no standards"}"`;
}

function getEslintConfig(moduleType: ModuleType) {
  return normaliseIndents`
        ${moduleType === ModuleType.COMMON_JS ? 'const { default: alexPlugin } = require("@alextheman/eslint-plugin")' : 'import alexPlugin from "@alextheman/eslint-plugin"'};
        ${moduleType === ModuleType.TYPESCRIPT ? 'import { typeScriptLanguageOptions } from "@alextheman/eslint-plugin/internal";' : ""}
        ${moduleType === ModuleType.COMMON_JS ? 'const { defineConfig } = require("eslint/config")' : 'import { defineConfig } from "eslint/config"'};

        ${moduleType === ModuleType.COMMON_JS ? "module.exports =" : "export default"} defineConfig({
            files: ["**/*.{js,ts}"],
            ${moduleType === ModuleType.TYPESCRIPT ? "languageOptions: typeScriptLanguageOptions," : ""}
            plugins: {
                "@alextheman": alexPlugin,
            },
            rules: {
                "@alextheman/has-standards": ["error", { fixable: true }],
            }
        })
    `;
}

const describe = parseBoolean(process.env.RUN_END_TO_END ?? "false")
  ? describeVitest
  : describeVitest.skip;

describe("Entrypoint for @alextheman/eslint-plugin", () => {
  describe.each<PackageManager>(["npm", "pnpm"])("Package manager %s", (packageManager) => {
    test.each<ModuleType>(["commonjs", "module", "typescript"])(
      "Module type %s",
      async (moduleType) => {
        await temporaryDirectoryTask(async (temporaryPath) => {
          const runCommandInTempDirectory = await setupPackageEndToEnd(
            temporaryPath,
            packageManager,
            moduleType,
            {
              dependencyGroup: "devDependencies",
              additionalDependencies: {
                devDependencies: [`eslint@^9.39.3`],
              },
            },
          );
          const codeFilePath = path.join(
            temporaryPath,
            "src",
            `standards.${moduleType === ModuleType.TYPESCRIPT ? "ts" : "js"}`,
          );
          const codeFileRelativePath = path.relative(temporaryPath, codeFilePath);
          await mkdir(path.dirname(codeFilePath), { recursive: true });
          await writeFile(
            path.join(temporaryPath, "eslint.config.js"),
            getEslintConfig(moduleType),
          );

          const tempPackageInfo = await getPackageJsonContents(temporaryPath);
          if (tempPackageInfo === null) {
            throw packageJsonNotFoundError(getPackageJsonPath(temporaryPath));
          }

          tempPackageInfo.scripts = {
            ...(tempPackageInfo.scripts ?? {}),
            format: `eslint --fix ${codeFileRelativePath}`,
            lint: `eslint ${codeFileRelativePath}`,
          };

          await writeFile(
            getPackageJsonPath(temporaryPath),
            JSON.stringify(tempPackageInfo, null, 2),
          );

          if (moduleType === ModuleType.TYPESCRIPT) {
            await writeFile(
              path.join(temporaryPath, "tsconfig.json"),
              JSON.stringify(
                {
                  ...tsConfig,
                  compilerOptions: omitProperties(tsConfig.compilerOptions ?? {}, "types"),
                },
                null,
                2,
              ),
            );
          }

          await writeFile(codeFilePath, getCodeString(moduleType, "success"));
          const { exitCode: lintSuccessExitCode } =
            await runCommandInTempDirectory`${packageManager} run lint`;
          expect(lintSuccessExitCode).toBe(0);

          await writeFile(codeFilePath, getCodeString(moduleType, "failure"));
          const { exitCode: lintFailureExitCode, stdout: errorMessage } =
            await runCommandInTempDirectory({ reject: false })`${packageManager} run lint`;
          expect(lintFailureExitCode).toBe(1);
          expect(errorMessage).toContain("@alextheman/has-standards");

          const { exitCode: formatExitCode } =
            await runCommandInTempDirectory`${packageManager} run format`;
          expect(formatExitCode).toBe(0);
          const fileContents = await readFile(codeFilePath, "utf-8");
          expect(fileContents).toBe(getCodeString(moduleType, "success"));
        });
      },
      90000,
    );
  });
});
