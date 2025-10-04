// @path: eslint.config.ts
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import i18next from 'eslint-plugin-i18next'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    plugins: { i18next },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',

      'i18next/no-literal-string': [
        'error',
        {
          markupOnly: false,
          ignoreAttribute: [
            'className',
            'id',
            'key',
            'to',
            'href',
            'src',
            'alt',
            'title',
            'placeholder',
            'aria-*',
            'data-*',
            'role',
          ],
          ignoreCallee: ['clsx', 'classnames', 'cn'],
          ignore: ['^\\s*$', '^[-_.#/]+$'],
        },
      ],
    },
  },
  {
    files: [
      'src/app/\\[lang\\]/styleguide/page.tsx',
      'src/content/**/*.*',
      '**/*.config.*',
      'next.config.*',
      'tailwind.config.*',
      '**/*.d.ts',
      '**/*.test.*',
      '**/__tests__/**',
    ],
    rules: {
      'i18next/no-literal-string': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'src/content/**/*.json',
    ],
  },
]

export default eslintConfig
