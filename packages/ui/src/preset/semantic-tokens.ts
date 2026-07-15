import type { SemanticTokens } from '@pandacss/dev';

export const semanticTokens: SemanticTokens = {
  colors: {
    layout: {
      primary: { value: '{colors.orange.500}' },
      'primary-dark': { value: '{colors.orange.600}' },
      'primary-subtle': { value: '{colors.orange.100}' },
      'bg-layer': { value: 'rgba(0, 0, 0, 0.6)' },
      'bg-light': { value: '{colors.white.default}' },
      'bg-light-blue': { value: '{colors.navy.100}' },
      'bg-light-green': { value: '{colors.green.100}' },
      'bg-light-gray': { value: '{colors.black.100}' },
      'bg-disable': { value: '{colors.black.100}' },
      'bg-issue': { value: '{colors.red.100}' },
      'default-line': { value: '{colors.black.200}' },
      'strong-line': { value: '{colors.black.500}' },
      'hilight-line': { value: '{colors.orange.300}' },
      'issue-line': { value: '{colors.red.500}' },
      emphasis: { value: '{colors.navy.500}' },
      'emphasis-dark': { value: '{colors.navy.700}' },
      'neutral-gray': { value: '{colors.black.400}' },
      'accent-secondary': { value: '{colors.green.500}' },
      issue: { value: '{colors.red.500}' },
      'bg-soft-gray': { value: '{colors.black.200}' },
    },
    text: {
      display: { value: '{colors.black.800}' },
      heading: { value: '{colors.black.800}' },
      strong: { value: '{colors.black.800}' },
      default: { value: '{colors.black.600}' },
      'default-light': { value: '{colors.white.default}' },
      soft: { value: '{colors.black.500}' },
      'accent-primary': { value: '{colors.orange.500}' },
      'accent-secondary': { value: '{colors.green.600}' },
      input: { value: '{colors.black.600}' },
      'input-soft': { value: '{colors.black.300}' },
      disable: { value: '{colors.black.300}' },
      issue: { value: '{colors.red.500}' },
    },
  },
  sizes: {
    wrap: {
      value: {
        mobile: '37.5rem',
        tablet: '76.8rem',
        desktop: '144rem',
      },
    },
    'button-height': { value: '6rem' },
    'input-height': { value: '4.8rem' },
  },
  spacing: {
    grid: {
      margin: {
        value: {
          mobile: '{spacing.16}',
          tablet: '{spacing.24}',
          desktop: '{spacing.80}',
        },
      },
      gutter: { value: '{spacing.16}' },
    },
  },
};
