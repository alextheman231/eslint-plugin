import type { NoRelativeImportsOptions } from "src/rules/no-relative-imports";

import { describe, test } from "vitest";

import createRuleTester from "tests/rule-testers/createRuleTester";

import rules from "src/rules";

describe("no-relative-imports", () => {
  const { valid, invalid } = createRuleTester<Array<NoRelativeImportsOptions>>({
    name: "no-relative-imports",
    rule: rules["no-relative-imports"],
  });

  describe("Valid", () => {
    test("Allows absolute imports", () => {
      valid('import myFunction from "src/utils/myFunction"');
    });
    test("Allows a root-level relative import as long as depth is set to 0", () => {
      valid({
        code: 'import myFunction from "./utils/myFunction";',
        options: [
          {
            depth: 0,
          },
        ],
      });
    });
    test("Allows a relative import allowed by the maximum depth provided", () => {
      valid({
        code: 'import myFunction from "src/utils/myFunction"',
        options: [
          {
            depth: 1,
          },
        ],
      });
      valid({
        code: 'import myFunction from "../utils/myFunction";',
        options: [
          {
            depth: 1,
          },
        ],
      });
      valid({
        code: 'import myFunction from "../../utils/myFunction";',
        options: [
          {
            depth: 2,
          },
        ],
      });
    });
  });

  describe("Invalid", () => {
    test("Does not allow relative imports", () => {
      invalid({
        code: 'import myFunction from "./utils/myFunction";',
        errors: [
          {
            messageId: "strictNoRelative",
            data: {
              source: "./utils/myFunction",
            },
          },
        ],
      });
      invalid({
        code: 'import myFunction from "../utils/myFunction";',
        errors: [
          {
            messageId: "strictNoRelative",
            data: {
              source: "../utils/myFunction",
            },
          },
        ],
      });
    });
    test("Does not allow relative imports exceeding root-level if depth of zero specified", () => {
      invalid({
        code: 'import myFunction from "../utils/myFunction";',
        options: [
          {
            depth: 0,
          },
        ],
        errors: [
          {
            messageId: "rootOnly",
            data: {
              source: "../utils/myFunction",
            },
          },
        ],
      });
    });
    test.each([
      ["../../utils/myFunction", 1],
      ["../../../utils/myFunction", 2],
    ])("Does not allow relative imports deeper than depth=%i", (source, depth) => {
      invalid({
        code: `import myFunction from "${source}";`,
        options: [{ depth }],
        errors: [
          {
            messageId: "exceededAllowedDepth",
            data: {
              source,
              depth,
              s: depth !== 1 ? "s" : "",
            },
          },
        ],
      });
    });
    test("Does not allow a mix of ./ and ../ at all", () => {
      invalid({
        code: 'import myFunction from "./../utils/myFunction";',
        options: [
          {
            depth: 1,
          },
        ],
        errors: [
          {
            messageId: "stupidPath",
            data: {
              source: "./../utils/myFunction",
            },
          },
        ],
      });
    });
    test("Does not allow ./ or ../ in the middle of an import path", () => {
      invalid({
        code: 'import myFunction from "src/components/../utils/myFunction";',
        options: [
          {
            depth: 1,
          },
        ],
        errors: [
          {
            messageId: "stupidPath",
            data: {
              source: "src/components/../utils/myFunction",
            },
          },
        ],
      });
      invalid({
        code: 'import myFunction from "src/./utils/myFunction";',
        options: [
          {
            depth: 1,
          },
        ],
        errors: [
          {
            messageId: "stupidPath",
            data: {
              source: "src/./utils/myFunction",
            },
          },
        ],
      });
    });
  });
});
