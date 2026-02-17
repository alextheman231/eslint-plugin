import { describe, test } from "vitest";

import createRuleTester from "tests/rule-testers/createRuleTester";

import rules from "src/rules";

describe("has-standards", () => {
  const { valid, invalid } = createRuleTester({
    name: "has-standards",
    rule: rules["has-standards"],
  });

  test("Allows strings with standards", () => {
    valid('const test = "I have standards, you\'d better have some too!";');
  });
  test("Does not allow strings with no standards", () => {
    invalid('const test = "I have no standards!";');
  });
});
