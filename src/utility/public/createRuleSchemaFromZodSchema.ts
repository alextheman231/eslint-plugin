import { omitProperties } from "@alextheman/utility";
import z from "zod";

import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

/**
 * Converts a Zod schema to a JSON schema for usage in an ESLint rule.
 *
 * @category Utility
 *
 * @param schema - The Zod schema to convert.
 *
 * @returns An array containing the resulting JSON Schema, formatted for ESLint rule schema compatibility.
 */
function createRuleSchemaFromZodSchema(schema: z.ZodType): JSONSchema4[] {
  return [omitProperties(z.toJSONSchema(schema), "$schema") as unknown as JSONSchema4];
}

export default createRuleSchemaFromZodSchema;
