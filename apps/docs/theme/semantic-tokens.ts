import type { SemanticTokens } from '@pandacss/dev';

export const docsSemanticTokens: SemanticTokens = {
  colors: {
    layout: {
      primary: { value: { base: '{colors.navy.500}', _dark: '{colors.navy.400}' } },
      'primary-dark': { value: { base: '{colors.navy.600}', _dark: '{colors.navy.500}' } },
      'primary-subtle': { value: { base: '{colors.navy.100}', _dark: '{colors.navy.700}' } },
      'bg-light': { value: { base: '{colors.white.default}', _dark: '{colors.black.800}' } },
      'bg-light-blue': { value: { base: '{colors.navy.100}', _dark: '{colors.navy.800}' } },
      'bg-light-green': { value: { base: '{colors.green.100}', _dark: '{colors.green.800}' } },
      'bg-light-gray': { value: { base: '{colors.black.100}', _dark: '{colors.black.700}' } },
      'bg-soft-gray': { value: { base: '{colors.black.200}', _dark: '{colors.black.700}' } },
      'bg-disable': { value: { base: '{colors.black.100}', _dark: '{colors.black.700}' } },
      'table-header': { value: { base: '{colors.black.100}', _dark: '{colors.black.700}' } },
      'default-line': { value: { base: '{colors.black.200}', _dark: '{colors.black.600}' } },
      'strong-line': { value: { base: '{colors.black.500}', _dark: '{colors.black.400}' } },
      'highlight-line': { value: { base: '{colors.navy.300}', _dark: '{colors.navy.500}' } },
      'neutral-gray': { value: { base: '{colors.black.400}', _dark: '{colors.black.300}' } },
    },
    text: {
      display: { value: { base: '{colors.black.800}', _dark: '{colors.black.100}' } },
      heading: { value: { base: '{colors.black.800}', _dark: '{colors.black.100}' } },
      strong: { value: { base: '{colors.black.800}', _dark: '{colors.black.100}' } },
      default: { value: { base: '{colors.black.600}', _dark: '{colors.black.300}' } },
      soft: { value: { base: '{colors.black.500}', _dark: '{colors.black.400}' } },
      'accent-primary': { value: { base: '{colors.navy.500}', _dark: '{colors.navy.300}' } },
      'accent-secondary': { value: { base: '{colors.green.600}', _dark: '{colors.green.300}' } },
      input: { value: { base: '{colors.black.600}', _dark: '{colors.black.300}' } },
      'input-soft': { value: { base: '{colors.black.300}', _dark: '{colors.black.500}' } },
      'input-strong': { value: { base: '{colors.black.600}', _dark: '{colors.black.200}' } },
      disable: { value: { base: '{colors.black.300}', _dark: '{colors.black.500}' } },
    },
  },
};
