import type { SemanticTokens } from '@pandacss/dev';

export const semanticTokens: SemanticTokens = {
  colors: {
    fg: {
      DEFAULT: { value: '{colors.gray.900}' },
      muted: { value: '{colors.gray.500}' },
    },
    bg: {
      DEFAULT: { value: '{colors.gray.50}' },
      subtle: { value: '{colors.gray.100}' },
    },
    border: {
      DEFAULT: { value: '{colors.gray.300}' },
    },
    accent: {
      default: { value: '{colors.blue.500}' },
      emphasized: { value: '{colors.blue.600}' },
    },
  },
};
