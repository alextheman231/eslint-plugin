import alexPlugin from "../dist/index.js";

export default [
  ...alexPlugin.configs["combined/tests"],
  ...alexPlugin.configs["internal/eslint-plugin-base"],
];
