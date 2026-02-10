[**@alextheman/eslint-plugin v5.6.2**](../README.md)

***

[@alextheman/eslint-plugin](../globals.md) / fixOnCondition

# Function: fixOnCondition()

> **fixOnCondition**(`fixable`, `fix`): `RuleFixerFunction`

Returns a rule fixer function to run based on a given condition

## Parameters

### fixable

`boolean`

Whether the rule should be treated as fixable or not, and therefore whether the fixer should run.

### fix

`RuleFixerFunction`

The rule fixer function to run.

## Returns

`RuleFixerFunction`

The rule fixer function invoked with the fixer, provided the fixable condition is met.
