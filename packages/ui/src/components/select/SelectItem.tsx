import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx';

export const SelectItem = styled(ArkSelect.Item, {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12',
    paddingInline: '12',
    minHeight: 'input-height',
    backgroundColor: 'layout.bg-light',
    color: 'text.input',
    textStyle: 'input.medium-light',
    cursor: 'pointer',
    _highlighted: {
      backgroundColor: 'layout.primary-subtle',
      color: 'text.accent-primary',
    },
    '&[data-state=checked]': {
      backgroundColor: 'layout.primary-subtle',
      color: 'text.accent-primary',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});
