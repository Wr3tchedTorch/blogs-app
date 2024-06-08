import globals from "globals";
import stylisticJs from '@stylistic/eslint-plugin-js';
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      "@stylistic/js/semi": ["error", "always"],
    }
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
];