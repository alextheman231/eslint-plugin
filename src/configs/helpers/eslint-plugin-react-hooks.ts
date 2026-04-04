import { omitProperties } from "@alextheman/utility";
// eslint-disable-next-line no-restricted-imports
import reactHooksPlugin from "eslint-plugin-react-hooks";

const reactHooks: Record<PropertyKey, any> = {
  ...reactHooksPlugin,
  configs: {
    ...omitProperties(reactHooksPlugin.configs, "flat"),
    "flat/recommended": reactHooksPlugin.configs.flat.recommended,
    "flat/recommended-latest": reactHooksPlugin.configs.flat["recommended-latest"],
  },
};

export default reactHooks;
