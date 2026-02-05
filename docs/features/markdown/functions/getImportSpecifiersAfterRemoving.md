[**@alextheman/eslint-plugin v5.5.2**](../README.md)

***

[@alextheman/eslint-plugin](../globals.md) / getImportSpecifiersAfterRemoving

# Function: getImportSpecifiersAfterRemoving()

> **getImportSpecifiersAfterRemoving**\<`RuleOptions`\>(`context`, `specifiers`, `importToRemove`): `string`

Returns a comma-separated string of import specifiers, excluding the specified import.

Useful for auto-fixable rules that remove a specific import from an import statement.

## Type Parameters

### RuleOptions

`RuleOptions`

The type of the RuleOptions from the given context.

## Parameters

### context

`Readonly`\<`RuleContext`\<`"message"`, \[`RuleOptions`\]\>\>

The current ESLint rule context.

### specifiers

`ImportClause`[]

Array of import clause nodes.

### importToRemove

`string`

The import name to remove from the list.

## Returns

`string`

A comma-separated string of import specifiers after removing the specified import.
