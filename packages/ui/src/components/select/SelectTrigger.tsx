import type { ComponentProps } from 'react';

import { Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx';

import { Icon } from '../icon/Icon';
import { SelectIndicator } from './SelectIndicator';

const Container = styled(ArkSelect.Trigger, {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12',
    paddingInline: '12',
    width: '100%',
    minHeight: 'input-height',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'layout.default-line',
    borderRadius: '8',
    backgroundColor: 'layout.bg-light',
    color: 'text.input',
    textStyle: 'input.medium-light',
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    _hover: {
      borderColor: 'layout.strong-line',
    },
    _open: {
      borderColor: 'layout.strong-line',
    },
    '&[data-invalid]': {
      backgroundColor: 'layout.bg-issue',
      borderColor: 'layout.issue-line',
    },
    _disabled: {
      backgroundColor: 'layout.bg-disable',
      borderColor: 'layout.default-line',
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});

type SelectTriggerProps = ComponentProps<typeof Container> & {
  hasIndicator?: boolean;
};

export function SelectTrigger({
  children,
  hasIndicator = true,
  ...props
}: SelectTriggerProps) {
  return (
    <Container {...props}>
      {children}
      {hasIndicator && (
        <SelectIndicator>
          <Icon name="chevron-down" />
        </SelectIndicator>
      )}
    </Container>
  );
}
