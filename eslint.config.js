import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '.astro']),

  {
    files: ['**/*.{ts,tsx,js,mjs}'],
    extends: [js.configs.recommended, tseslint.configs.recommended, prettierConfig],
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        ...globals.browser,
        ...globals.es6,
        ...globals.vitest,
        ...globals.node,
        NodeJS: 'writable',
        vi: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      curly: 1,
      'import/no-cycle': 'error',
      'import/no-extraneous-dependencies': ['error'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-undef': 'error',
      'prettier/prettier': ['error', { endOfLine: 'auto' }, { usePrettierrc: true }],
      semi: ['error', 'never'],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
  },

  {
    files: ['src/**/*.ts'],
    rules: {
      '@typescript-eslint/no-this-alias': 'off',
    },
  },
])
