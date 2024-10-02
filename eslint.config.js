// @ts-check

import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
  ...tseslint.configs.recommended
);
