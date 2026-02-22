[**@alextheman/eslint-plugin v5.9.0**](../README.md)

***

[@alextheman/eslint-plugin](../globals.md) / GetFlattenedConfigNames

# Type Alias: GetFlattenedConfigNames\<ConfigObject\>

> **GetFlattenedConfigNames**\<`ConfigObject`\> = `` { [Group in keyof ConfigObject & string]: `${CamelToKebab<Group>}/${CamelToKebab<keyof ConfigObject[Group] & string>}` } ``\[keyof `ConfigObject` & `string`\]

A helper type to turn the keys of a doubly-nested object into a flattened ESLint config key.

## Type Parameters

### ConfigObject

`ConfigObject` *extends* `{ [K in keyof ConfigObject]: Record<string, Linter.Config[]> }`

## Example

```typescript
type ConfigNames = GetFlattenedConfigNames<{ general: { typescriptReact }}> // "general/typescript-react"
```
