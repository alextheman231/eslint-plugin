import type { NoNamespaceImportsOptions } from "src/rules/no-namespace-imports";

import { describe, test } from "vitest";

import createRuleTester from "tests/rule-testers/createRuleTester";

import rules from "src/rules";

describe("no-namespace-imports", () => {
  const { valid, invalid } = createRuleTester<Array<NoNamespaceImportsOptions>>({
    name: "no-namespace-imports",
    rule: rules["no-namespace-imports"],
  });

  describe("Valid", () => {
    test("Allows named imports", () => {
      valid('import { useState } from "react";');
    });
    test("Allows default imports", () => {
      valid('import alexPlugin from "@alextheman/eslint-plugin";');
    });
    test("Allows specified allowed namespace imports", () => {
      valid({
        code: 'import * as React from "react";',
        options: [
          {
            allow: ["react"],
          },
        ],
      });
    });
  });

  describe("Invalid", () => {
    test("Does not allow any namespace imports if no allowed paths specified", () => {
      invalid({
        code: 'import * as React from "react";',
        errors: [
          {
            messageId: "message",
            data: {
              source: "react",
            },
          },
        ],
      });
    });
    test("Does not allow namespace imports not specified in the allow option", () => {
      invalid({
        code: 'import * as MUI from "@mui/material";',
        options: [
          {
            allow: ["react"],
          },
        ],
        errors: [
          {
            messageId: "message",
            data: {
              source: "@mui/material",
            },
          },
        ],
      });
    });
    test("Does not allow a namespace import when mixed with a default import", () => {
      invalid({
        code: 'import defaultImport, * as Utils from "utils";',
        errors: [
          {
            messageId: "message",
            data: {
              source: "utils",
            },
          },
        ],
      });
    });
  });
});
