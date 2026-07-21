import type { TextStyles } from '@pandacss/dev';

export const docsTextStyles: TextStyles = {
  heading: {
    hero: {
      value: {
        fontFamily: '{fonts.body}',
        fontSize: '5.6rem',
        fontWeight: '{fontWeights.bold}',
        lineHeight: '1.1',
        letterSpacing: '-0.03em',
      },
    },
    'section-cta': {
      value: {
        fontFamily: '{fonts.body}',
        fontSize: '3.6rem',
        fontWeight: '{fontWeights.bold}',
        lineHeight: '1.4',
        letterSpacing: '-0.03em',
      },
    },
  },
};
