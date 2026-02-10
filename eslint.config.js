import alexPlugin from "./dist/index.js";

export default [
  ...alexPlugin.configs["internal/eslint-plugin"],
  ...alexPlugin.configs["general/package-json"],
];
