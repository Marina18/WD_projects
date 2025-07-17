import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// This ESLint configuration is tailored for a React application using Vite.
// It extends recommended rules for JavaScript and React, and sets up the environment for browser globals.
// The configuration also includes specific rules for unused variables, allowing for certain patterns to be ignored.
// The configuration is designed to work with the latest ECMAScript features and JSX syntax.
// The global ignores are set to exclude the 'dist' directory from linting.
// The 'root' div in the HTML file is where the React app will be mounted,
// and the 'main.jsx' script is the entry point for the React application.
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
