import { definePreset } from '@pandacss/dev';

import { docsSemanticTokens } from './semantic-tokens';
import { docsTextStyles } from './text-styles';

export const docsPreset = definePreset({
  name: 'vinyl-ui-docs-preset',
  theme: {
    extend: {
      semanticTokens: docsSemanticTokens,
      textStyles: docsTextStyles,
    },
  },
});
