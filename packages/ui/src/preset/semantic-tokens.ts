import type { SemanticTokens } from '@pandacss/dev';

export const semanticTokens: SemanticTokens = {
  colors: {
    layout: {
      primary: { value: '{colors.navy.500}' },
      'primary-dark': { value: '{colors.navy.600}' },
      'primary-subtle': { value: '{colors.navy.100}' },
      emphasis: { value: '{colors.black.500}' },
      'emphasis-dark': { value: '{colors.black.600}' },
      'neutral-gray': { value: '{colors.black.400}' },
      'accent-secondary': { value: '{colors.green.500}' },
      issue: { value: '{colors.red.500}' },
      'bg-soft-gray': { value: '{colors.black.200}' },
      'bg-layer': { value: 'rgba(0, 0, 0, 0.6)' },
      'bg-light': { value: '{colors.white.default}' },
      'bg-light-blue': { value: '{colors.navy.100}' },
      'bg-light-green': { value: '{colors.green.100}' },
      'bg-light-gray': { value: '{colors.black.100}' },
      'bg-disable': { value: '{colors.black.100}' },
      'bg-issue': { value: '{colors.red.100}' },
      'default-line': { value: '{colors.black.200}' },
      'strong-line': { value: '{colors.black.500}' },
      'highlight-line': { value: '{colors.navy.300}' },
      'issue-line': { value: '{colors.red.500}' },
      'table-header': { value: '{colors.black.100}' },
    },
    text: {
      display: { value: '{colors.black.800}' },
      heading: { value: '{colors.black.800}' },
      'heading-light': { value: '{colors.white.default}' },
      strong: { value: '{colors.black.800}' },
      default: { value: '{colors.black.600}' },
      'default-light': { value: '{colors.white.default}' },
      soft: { value: '{colors.black.500}' },
      'accent-primary': { value: '{colors.navy.500}' },
      'accent-secondary': { value: '{colors.green.600}' },
      input: { value: '{colors.black.600}' },
      'input-soft': { value: '{colors.black.300}' },
      'input-strong': { value: '{colors.black.600}' },
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
  fontSizes: {
    heading: {
      xxlarge: { value: { base: '4rem', tablet: '4.8rem', desktop: '4.8rem' } },
      xlarge: { value: { base: '2.8rem', tablet: '4rem', desktop: '4rem' } },
      large: { value: { base: '2.4rem', tablet: '4rem', desktop: '4rem' } },
      medium: { value: { base: '1.8rem', tablet: '3.2rem', desktop: '3.2rem' } },
      small: { value: { base: '1.6rem', tablet: '2rem', desktop: '2rem' } },
    },
    body: {
      xlarge: { value: '2.4rem' },
      large: { value: { base: '1.8rem', tablet: '2rem', desktop: '2rem' } },
      medium: { value: '1.6rem' },
      small: { value: '1.4rem' },
      xsmall: { value: '1.2rem' },
    },
    button: {
      large: { value: '1.8rem' },
      medium: { value: '1.6rem' },
      small: { value: '1.4rem' },
    },
    input: {
      medium: { value: { base: '1.8rem', tablet: '1.6rem', desktop: '1.6rem' } },
      small: { value: { base: '1.6rem', tablet: '1.4rem', desktop: '1.4rem' } },
      xsmall: { value: '1.4rem' },
    },
  },
};
