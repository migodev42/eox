/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'no-unused-vars': 'warn',
    'react/display-name': 'off',
    'react/prop-types': 'off',
  },
};
