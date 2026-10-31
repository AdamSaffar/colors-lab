import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["js/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.browser,
        md5: "readonly",
        module: "readonly"
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["error", { vars: "local" }]
    }
  },
  {
    files: ["js/md5.js"],
    linterOptions: {
      reportUnusedDisableDirectives: "off"
    }
  }
];
