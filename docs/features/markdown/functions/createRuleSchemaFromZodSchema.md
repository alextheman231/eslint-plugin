[**@alextheman/eslint-plugin v5.8.2**](../README.md)

***

[@alextheman/eslint-plugin](../globals.md) / createRuleSchemaFromZodSchema

# Function: createRuleSchemaFromZodSchema()

> **createRuleSchemaFromZodSchema**(`schema`): `JSONSchema4`[]

Converts a Zod schema to a JSON schema for usage in an ESLint rule.

## Parameters

### schema

`ZodType`

The Zod schema to convert.

## Returns

`JSONSchema4`[]

An array containing the resulting JSON Schema, formatted for ESLint rule schema compatibility.
