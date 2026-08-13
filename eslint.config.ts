import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: [
      'node_modules/',
      'build/',
      'coverage/',
    ],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],

    languageOptions: {
      globals: globals.node,
    },

    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      'no-undef': 'off',

      semi: ['error', 'never'],

      quotes: [
        'error',
        'single',
        {
          allowTemplateLiterals: true,
        },
      ],
    },
  },
])