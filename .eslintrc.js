const pkg = require('./package.json')

const config = {
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
    "no-undef": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}

module.exports = config
