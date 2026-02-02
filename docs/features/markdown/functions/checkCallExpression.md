[**@alextheman/eslint-plugin v5.5.1**](../README.md)

***

[@alextheman/eslint-plugin](../globals.md) / checkCallExpression

# Function: checkCallExpression()

> **checkCallExpression**(`node`, `objectName`, `propertyName`): `boolean`

Checks if a given node matches the expected object and property names.

## Parameters

### node

`CallExpression`

The node to check.

### objectName

`string`

The object name to compare against the node.

### propertyName

`string`

The property name to compare against the node.

## Returns

`boolean`

A value of `true` if the given `objectName` and `propertyName` matches those of the node, and `false` otherwise.
