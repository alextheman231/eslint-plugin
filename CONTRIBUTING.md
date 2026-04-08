# Contributing

## Creating a new rule

To add a new rule, you must first create the skeleton structure of your rule, following the given template:

```typescript
const myRule = createRule({
  name: "my-rule",
  meta: {
    docs: {
      description: "Description of the rule",
    },
    messages: {
      message: "Message to be displayed on violation",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    
  },
});

export default myRule;
```

The schema may take an array of objects defining what options can be configured. At the very least, these take in a type, but if you specify the type as object, you must also provide the properties. For example:

```typescript
schema: [
    {
        type: "object",
        properties: {
            preference: {
            type: "string",
            },
        },
        additionalProperties: false,
    }
]
```

Add the rule to `src/rules/index.ts`:

```typescript
import consistentTestFunction from "src/rules/consistent-test-function";
import noIsolatedTests from "src/rules/no-isolated-tests";
import noNamespaceImports from "src/rules/no-namespace-imports";
// ...
import myRule from "src/rules/my-rule"

export default {
  "consistent-test-function": consistentTestFunction,
  "no-isolated-tests": noIsolatedTests,
  "no-namespace-imports": noNamespaceImports,
  // ...
  "my-rule": myRule
};
```

Next, create the test suite for the rule. You should use the `createRuleTester` function from `tests/rule-testers/createRuleTester` in the following way:

```typescript
import createRuleTester from "tests/rule-testers/createRuleTester";
import { describe, test } from "vitest";

import rules from "src/rules";

describe("example-rule", () => {
  const { valid, invalid } = createRuleTester({
    name: "example-rule",
    rule: rules["example-rule"],
  });

  describe("Valid", () => {
    test("A valid case", () => {
      valid("// Valid code here");
    });
  });

  describe("Invalid", () => {
    test("An invalid case", () => {
      invalid({
        code: "Invalid code here",
        errors: [
          {
            messageId: "message",
          },
        ],
      });
    });
  });
});
```

Finally, you may create your rule by adding code to the `create(context)` method. Creating an ESLint rule is one of things that is very involved and goes beyond the scope of this CONTRIBUTING document, but you can check out [the ESLint docs](https://eslint.org/docs/latest/extend/custom-rule-tutorial) for more information. When in doubt, follow the structure of an existing rule in this repository.

### Adding a config

Starting with the general config because that's the easiest - you can create a config file in `src/configs/general` and define a config in the same way you would define any regular ESLint flat config. Again, please make sure you do NOT include any plugin-specific rules.

Once you have done this, export it from `src/configs/general/index.ts`, then in `src/alexPlugin.ts`, go to where `alexPlugin.configs`is defined and add the config to the object defined under the `general` property.

```typescript
alexPlugin.configs = createPluginConfigs({
  general: {
    javaScript: javaScriptBase,
    typeScript: typeScriptBase,
    react: reactBase,
    tests: testsBase,
  },
  // ...
});
```

The `createPluginConfigs` helper will map this to a more standard ESLint naming convention. That is, something like `{ general: { myRuleset } }` will be accessible on the plugin from `plugin.configs["general/my-ruleset"]`.

For plugin/combined configs, this is where it gets trickier. These rulesets tend to rely on the usage of the plugin itself, but we also need to define the plugin to be able to use it in configs. As such, the workaround for this is to provide a function that takes in the plugin and returns the config. For example:

```typescript
import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

function createPluginBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    {
      plugins: {
        "@alextheman": plugin,
      },
      rules: {
        "@alextheman/no-namespace-imports": "error",
        "@alextheman/no-relative-imports": "error",
        "@alextheman/use-normalized-imports": "error",
        "@alextheman/use-object-shorthand": "error",
      },
    },
  ];
}

export default createPluginBaseConfig;
```

This then gets exported from the relevant folder's `index.ts` file again, and then where we define our configs in `src/alexPlugin.ts`, we invoke the function passing in the plugin.

```typescript
alexPlugin.configs = createPluginConfigs({
  // ...
  plugin: {
    base: createPluginBaseConfig(alexPlugin),
    tests: createPluginTestsBaseConfig(alexPlugin),
  },
  combined: {
    javaScript: createCombinedJavaScriptBaseConfig(alexPlugin),
    typeScript: createCombinedTypeScriptBaseConfig(alexPlugin),
    react: createCombinedReactBaseConfig(alexPlugin),
    tests: createCombinedTestsBaseConfig(alexPlugin),
    typeScriptReact: createCombinedTypeScriptReactBaseConfig(alexPlugin),
    javaScriptReact: createCombinedJavaScriptReactBaseConfig(alexPlugin),
  },
});
```

Note that this also means that, in config files that provide them using this functional approach, we should NEVER import the plugin directly. This would most likely create circular imports where the plugin ends up calling itself while trying to define itself. Instead, always use the given plugin argument if you want to access the plugin. In the combined configs, if you want to refer to an existing plugin ruleset, it's best to import the function for that ruleset, then call it and pass in the plugin, like so:

```typescript
import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import { typeScriptBase } from "src/configs/general";
import { createPluginBaseConfig } from "src/configs/plugin";

function createCombinedTypeScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createPluginBaseConfig(plugin), ...typeScriptBase];
}

export default createCombinedTypeScriptBaseConfig;
```

## General workflow summary

1. Create the skeleton of the feature.
2. Add tests if necessary.
3. Implement the feature, using the tests to guide you if present.
4. Commit the feature by itself.
5. If intending to release, create a release note, carefully deciding if it's a major, minor, or patch release (if adding to a release that is about to happen, add to the existing note)
6. Commit the release note separately from the feature.
7. Create a feature pull request and wait for it to be merged, choosing the appropriate template.
8. Run the commit-version-change workflow to create a pull request to change just the version.
9. Merge it in once CI passes.
10. All done!
