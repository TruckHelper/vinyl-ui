import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx';

export const SelectGroup = styled(ArkSelect.ItemGroup, {
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
});
