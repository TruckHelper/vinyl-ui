import { definePreset } from '@pandacss/dev';

import { docsTextStyles } from './text-styles';
import { docsTokens } from './tokens';

export const docsPreset = definePreset({
  name: 'vinyl-ui-docs-preset',
  theme: {
    extend: {
      tokens: docsTokens,
      textStyles: docsTextStyles,
    },
  },
});
