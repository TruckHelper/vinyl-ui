import js from '@eslint/js';

import globals from 'globals';

import tseslint from 'typescript-eslint';

import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';

import pandaPlugin from '@pandacss/eslint-plugin';

import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: [
      '**/dist',
      '**/styled-system',
      '**/.next',
      '**/.source',
      '**/node_modules',
      '**/coverage',
      '**/next-env.d.ts',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['**/__tests__/**/*.{ts,tsx}', '**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.tsx'],
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      import: pluginImport,
      'jsx-a11y': pluginJsxA11y,
      '@pandacss': pandaPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: [
            './packages/ui/tsconfig.json',
            './apps/docs/tsconfig.json',
          ],
        },
      },
    },
    rules: {
      curly: 'error',
      'no-shadow': 'off',
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.config.ts',
          '**/*.config.js',
          '**/jest.setup.ts',
          '**/src/preset/**',
          '**/theme/**',
        ],
        packageDir: [
          './',
          './packages/ui',
          './apps/docs',
        ],
      }],
      'import/extensions': ['error', 'ignorePackages', {
        ts: 'never',
        tsx: 'never',
      }],
      'react/jsx-filename-extension': [2, {
        extensions: ['.tsx'],
      }],
      'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
      'react/require-default-props': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
      '@pandacss/no-hardcoded-color': 'error',
      '@pandacss/no-invalid-token-paths': 'error',
    },
  },
  prettierConfig,
];
