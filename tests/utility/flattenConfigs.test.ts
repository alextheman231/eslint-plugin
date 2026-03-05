import type { Linter } from "eslint";

import { describe, expect, expectTypeOf, test } from "vitest";

import flattenConfigs from "src/utility/public/flattenConfigs";

describe("flattenConfigs", () => {
  test("Flattens a nested object, combining the keys into a single key separated by slash", () => {
    const inputObject = { hello: { world: [] } };
    const configKeys = Object.keys(flattenConfigs(inputObject));
    expect(configKeys).toContain("hello/world");
  });

  test("Converts the keys to kebab-case", () => {
    const inputObject = {
      hello: {
        testConfig: [],
      },
      thisIs: {
        anotherTest: [],
      },
    };
    const configKeys = Object.keys(flattenConfigs(inputObject));

    expect(configKeys).toContain("hello/test-config");
    expect(configKeys).toContain("this-is/another-test");
  });

  test("Does not converts consecutive capitals", () => {
    const inputObject = {
      backEnd: {
        configAPI: [],
      },
    };

    const configKeys = Object.keys(flattenConfigs(inputObject));
    expect(configKeys).toContain("back-end/config-a-p-i");
  });

  test("The types of the config keys match what we get at runtime", () => {
    const inputObject = {
      hello: {
        testConfig: [],
      },
      thisIs: {
        anotherTest: [],
      },
      backEnd: {
        configAPI: [],
      },
    };

    const _flattenedObject = flattenConfigs(inputObject);
    expectTypeOf<keyof typeof _flattenedObject>().toEqualTypeOf<
      "hello/test-config" | "this-is/another-test" | "back-end/config-a-p-i"
    >();
  });

  test("The function returns the configs themselves as well", () => {
    const inputObject = {
      hello: {
        testConfig: [
          {
            rules: {
              "no-restricted-imports": "error",
            },
          },
        ] satisfies Array<Linter.Config>,
      },
    };

    const flattenedObject = flattenConfigs(inputObject);
    expect(flattenedObject["hello/test-config"]).toEqual([
      {
        rules: {
          "no-restricted-imports": "error",
        },
      },
    ]);
  });
});
