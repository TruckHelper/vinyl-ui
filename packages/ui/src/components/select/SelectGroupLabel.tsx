import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx';

export const SelectGroupLabel = styled(ArkSelect.ItemGroupLabel, {
  base: {
    paddingInline: '12',
    paddingBlock: '8',
    color: 'text.soft',
    textStyle: 'body.small-normal',
  },
});
