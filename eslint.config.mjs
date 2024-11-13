import globals from 'globals'
import * as tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier'

const config = {
  files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '*.config.{js,ts}',
    'apps/provider/**',
    'apps/backend/**',
    'apps/server/**',
    'eslint.config.mjs'
  ],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.browser
    },
    parser: tseslint.parser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      project: './tsconfig.json'
    }
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    react: reactPlugin,
    prettier: prettierPlugin
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // prettier rules
    'prettier/prettier': 'error',

    // typescript rules
    ...tseslint.configs.recommended.rules,

    // react rules
    'react/display-name': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-unknown-property': 'error',
    'react/require-render-return': 'error'
  }
}

export default config
