[**@alextheman/eslint-plugin v5.5.1**](../README.md)

***

[@alextheman/eslint-plugin](../globals.md) / combineRestrictedImports

# Function: combineRestrictedImports()

> **combineRestrictedImports**(...`groups`): [`NoRestrictedImportsOptions`](../type-aliases/NoRestrictedImportsOptions.md)

Combines multiple option groups for the native ESLint `no-restricted-imports` rule, without overwriting previous configurations.

## Parameters

### groups

...[`NoRestrictedImportsOptions`](../type-aliases/NoRestrictedImportsOptions.md)[]

Option groups to combine, applied in the order provided.

## Returns

[`NoRestrictedImportsOptions`](../type-aliases/NoRestrictedImportsOptions.md)

A new object combining all paths and patterns from the given groups, suitable as an option to pass to `no-restricted-imports`.
