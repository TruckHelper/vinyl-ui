import { definePreset } from '@pandacss/dev';

import { tokens } from './tokens';
import { semanticTokens } from './semantic-tokens';
import { textStyles } from './text-styles';

export const preset = definePreset({
  name: 'vinyl-ui-preset',
  globalCss: {
    html: { fontSize: '62.5%' },
    body: { fontSize: '1.6rem' },
  },
  theme: {
    breakpoints: {
      mobile: '375px',
      tablet: '768px',
      desktop: '1440px',
    },
    tokens,
    semanticTokens,
    textStyles,
  },
});
