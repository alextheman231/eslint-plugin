import type { Linter } from "eslint";

import generalReact from "src/configs/general/react";
import internalReact from "src/configs/internal/react";

const combinedReact: Array<Linter.Config> = [
  { name: "@alextheman/combined/react" },
  ...generalReact,
  ...internalReact,
];

export default combinedReact;
