// @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import eslintPluginTs from '@typescript-eslint/eslint-plugin'

export default [
  ...tanstackConfig,

  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': eslintPluginTs
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }]
    }
  }
]
