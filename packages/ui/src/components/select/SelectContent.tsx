'use client';

import type { ComponentProps } from 'react';

import { Portal, Select as ArkSelect } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Positioner = styled(ArkSelect.Positioner, {
  base: {
    width: 'var(--reference-width)',
  },
});

const Container = styled(ArkSelect.Content, {
  base: {
    zIndex: 'dropdown',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'layout.default-line',
    borderRadius: '8',
    backgroundColor: 'layout.bg-light',
    overflow: 'hidden',
  },
});

type SelectContentProps = ComponentProps<typeof Container>;

export function SelectContent({ children, ...props }: SelectContentProps) {
  return (
    <Portal>
      <Positioner>
        <Container {...props}>
          {children}
        </Container>
      </Positioner>
    </Portal>
  );
}