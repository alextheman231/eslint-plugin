import type { ConsistentTestFunctionOptions } from "src/rules/consistent-test-function";

import { normaliseIndents } from "@alextheman/utility";
import { describe, test } from "vitest";

import createRuleTester from "tests/rule-testers/createRuleTester";

import rules from "src/rules";

describe("consistent-test-function", () => {
  const { valid, invalid } = createRuleTester<Array<ConsistentTestFunctionOptions>>({
    name: "consistent-test-function",
    rule: rules["consistent-test-function"],
  });

  describe("Valid", () => {
    test("Allows test when preference is set to test", () => {
      valid({
        code: normaliseIndents`
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        options: [
          {
            preference: "test",
          },
        ],
      });
    });
    test("Defaults to test if preference is not set", () => {
      valid(normaliseIndents`
            import { test } from "vitest";
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `);
    });
    test("Allows imported usage of test", () => {
      valid(normaliseIndents`
            import { test } from "vitest";
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `);
    });
    test("Allows it when preference is set to it", () => {
      valid({
        code: normaliseIndents`
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        options: [
          {
            preference: "it",
          },
        ],
      });
    });
    test("Allows imported it usage when preference is set to it", () => {
      valid({
        code: normaliseIndents`
            import { it } from "vitest";
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        options: [
          {
            preference: "it",
          },
        ],
      });
    });
  });

  describe("Invalid", () => {
    test("Does not allow it and changes it to test if no preference is set (defaults to test)", () => {
      invalid({
        code: normaliseIndents`
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        output: normaliseIndents`
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        errors: [
          {
            messageId: "message",
            data: {
              source: "it",
              preference: "test",
            },
          },
        ],
      });
    });
    test("Changes imports from it to test", () => {
      invalid({
        code: normaliseIndents`
            import { it } from "vitest";
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        output: normaliseIndents`
            import { test } from "vitest";
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        errors: [
          {
            messageId: "message",
            data: {
              source: "it",
              preference: "test",
            },
          },
          {
            messageId: "message",
            data: {
              source: "it",
              preference: "test",
            },
          },
        ],
      });
    });
    test("Changes test to it if preference set to it", () => {
      invalid({
        code: normaliseIndents`
            import { test } from "vitest";
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        options: [
          {
            preference: "it",
          },
        ],
        output: normaliseIndents`
            import { it } from "vitest";
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        errors: [
          {
            messageId: "message",
            data: {
              source: "test",
              preference: "it",
            },
          },
          {
            messageId: "message",
            data: {
              source: "test",
              preference: "it",
            },
          },
        ],
      });
    });
    test("If test and it imported, only get rid of it and change it usage to test", () => {
      invalid({
        code: normaliseIndents`
            import { test, it } from "vitest"
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            test("Does another thing", () => {
                expect(2).toBe(2);
            })
            `,
        output: normaliseIndents`
            import { test } from "vitest"
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            test("Does another thing", () => {
                expect(2).toBe(2);
            })
            `,
        errors: [
          {
            messageId: "message",
            data: {
              source: "it",
              preference: "test",
            },
          },
          {
            messageId: "message",
            data: {
              source: "it",
              preference: "test",
            },
          },
        ],
      });
    });
    test("Changes the base aliasing", () => {
      invalid({
        code: normaliseIndents`
            import { it as testFunction } from "vitest";
            testFunction("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        output: normaliseIndents`
            import { test as testFunction } from "vitest";
            testFunction("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        errors: [
          {
            messageId: "message",
            data: {
              source: "it",
              preference: "test",
            },
          },
        ],
      });
    });
    test("Changes the base aliasing when test is used when preference set to it", () => {
      invalid({
        code: normaliseIndents`
            import { test as itFunction } from "vitest";
            itFunction("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        options: [
          {
            preference: "it",
          },
        ],
        output: normaliseIndents`
            import { it as itFunction } from "vitest";
            itFunction("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        errors: [
          {
            messageId: "message",
            data: {
              source: "test",
              preference: "it",
            },
          },
        ],
      });
    });
    test("Does not autofix if fixable is set to false", () => {
      invalid({
        code: normaliseIndents`
            import { it } from "vitest";
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        options: [
          {
            fixable: false,
          },
        ],
        errors: [
          {
            messageId: "message",
            data: {
              source: "it",
              preference: "test",
            },
          },
          {
            messageId: "message",
            data: {
              source: "it",
              preference: "test",
            },
          },
        ],
      });
    });
    test("Does not autofix is preference set to it and fixable is set to false", () => {
      invalid({
        code: normaliseIndents`
            import { test } from "vitest";
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
        options: [
          {
            preference: "it",
            fixable: false,
          },
        ],
        errors: [
          {
            messageId: "message",
            data: {
              source: "test",
              preference: "it",
            },
          },
          {
            messageId: "message",
            data: {
              source: "test",
              preference: "it",
            },
          },
        ],
      });
    });
  });
});
