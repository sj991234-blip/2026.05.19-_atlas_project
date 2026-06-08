module.exports = {
  ignores: ["node_modules/**", "package-lock.json"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      window: "readonly",
      document: "readonly",
      navigator: "readonly",
      fetch: "readonly",
      localStorage: "readonly",
      sessionStorage: "readonly",
      console: "readonly",
      setTimeout: "readonly",
      alert: "readonly"
    }
  },
  rules: {
    "no-unused-vars": ["warn", { "args": "none", "ignoreRestSiblings": true }],
    "no-console": "off",
    "no-undef": "error",
    "quotes": ["warn", "single", { "avoidEscape": true }],
    "semi": ["warn", "always"],
    "indent": ["warn", 2],
    "comma-dangle": ["warn", "never"]
  }
};
