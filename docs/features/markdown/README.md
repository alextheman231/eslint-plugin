**@alextheman/eslint-plugin v5.4.3**

***

# @alextheman/eslint-plugin

This is my personal ESLint plugin. It provides custom ESLint rules along with some base configs that you can just drop straight into your project with minimal setup.

## Installation

To install this plugin into your project, you can do so with the following command:

```bash
npm install --save-dev @alextheman/eslint-plugin
```

Since most of the time, you will be using this plugin only to check your code as opposed to using it at runtime, we recommend installing it as a dev dependency. If you are using this in your own ESLint plugin, however, we recommend installing it as a peer dependency

```bash
npm install --save-peer @alextheman/eslint-plugin
```

## Configs
### The Config Groups

The configs of this plugin are structured in a very particular way. We have our general configs in `src/configs/general`, our plugin configs in `src/configs/plugin`, our personal internal configs in `src/configs/personal`, and our combined configs in `src/configs/combined`. In all three cases, we use the [ESLint flat config style](https://eslint.org/blog/2022/08/new-config-system-part-2/) as that's the most up-to-date config style and allows for more flexibility than just using a package.json or .eslintrc.

The general configs are to be used for defining a ruleset that does NOT rely on the custom plugin rules. They must ONLY use external rules.

The plugin configs are to be used for defining a ruleset that ONLY relies on the custom plugin rules. They must NOT use any external rules. This ensures that, for any users who just want a few recommended configs for only the plugin's rules, they can choose from the ones provided without also having to deal with a bunch of other external rules polluting it as well.

The personal configs are to be used for defining a ruleset to primarily be used in my own projects. They are likely to change according to the needs of my own projects without taking public usage into account and is therefore not recommended to be used outside of my own projects.

Lastly, the combined configs may use combinations of both external rules and custom rules. They will most frequently extend configs from any group. It is the most likely one to break on new updates, so I would recommend against using configs from this group in production code and go with one of the other more stable ones (unless you're me and actually control the plugin entirely).

### Usage

The configs are defined on the configs property of the plugin. All general rules are prefixed with `general/`, and likewise for the plugin and combined rules. All rulesets themselves are given in `kebab-case`. With that in mind, an example usage in `eslint.config.js` may look like this:

```javascript
import plugin from "@alextheman/eslint-plugin"

export default plugin.configs["general/typescript-base"]
```

If you want to extend this, you can do so by spreading the rules into an array and adding extra configuration properties:

```javascript
import plugin from "@alextheman/eslint-plugin"

export default [
    ...plugin.configs["general/typescript-base"],
    {
        rules: {
            "no-unused-vars": "off"
        }
    }
]
```
