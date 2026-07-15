import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx';

export const SelectControl = styled(ArkSelect.Control, {
  base: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
});
