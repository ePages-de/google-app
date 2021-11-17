const pkg = require('./package.json')

const config = {
  plugins: [
    "simple-import-sort"
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "no-undef": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}

module.exports = config
