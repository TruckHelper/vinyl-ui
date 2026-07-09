import { definePreset } from '@pandacss/dev';

import { tokens } from './tokens';
import { semanticTokens } from './semantic-tokens';

export const preset = definePreset({
  name: 'vinyl-ui-preset',
  theme: {
    tokens,
    semanticTokens,
  },
});
