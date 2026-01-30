[**@alextheman/eslint-plugin v5.5.0**](../README.md)

***

[@alextheman/eslint-plugin](../globals.md) / flattenConfigs

# Function: flattenConfigs()

> **flattenConfigs**\<`ConfigObject`\>(`config`): `Record`\<[`GetFlattenedConfigNames`](../type-aliases/GetFlattenedConfigNames.md)\<`ConfigObject`\>, `Linter.Config`[]\>

Takes in a nested group of configs, and returns them flattened according to ESLint config naming conventions.

## Type Parameters

### ConfigObject

`ConfigObject` *extends* \{ \[K in string \| number \| symbol\]: Record\<string, Config\<RulesConfig\>\[\]\> \}

The type of the input config object.

## Parameters

### config

`ConfigObject`

A doubly-nested config object to pass in, where the key of the top-level object is the config group name, and the key of the nested object is the name of the config within the group (e.g. `groupName.configName`).

## Returns

`Record`\<[`GetFlattenedConfigNames`](../type-aliases/GetFlattenedConfigNames.md)\<`ConfigObject`\>, `Linter.Config`[]\>

A single-layered object with the key flattened down to be `group-name/config-name`.

## Example

```ts
flattenConfigs<AlexPluginConfigGroup>({
         general: {
             typeScript: generalTypeScriptConfig,
             javaScript: generalJavaScriptConfig,
             react: generalReactConfig,
             // ...
         }
         plugin: {
             base: pluginBaseConfig,
             tests: pluginTestsConfig,
             // ...
         }
     })

     // Returns:
     {
         "general/typescript": generalTypeScriptConfig,
         "general/javascript": generalJavaScriptConfig,
         "general/react": generalReactConfig,
         // ...,
         "plugin/base": pluginBaseConfig,
         "plugin/tests": pluginTestsConfig
         // ...
     }
```
