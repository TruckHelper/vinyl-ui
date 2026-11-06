'use client';

import type { ComponentProps } from 'react';

import { Combobox as ArkCombobox, Portal } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Positioner = styled(ArkCombobox.Positioner, {
  base: {
    width: 'var(--reference-width)',
  },
});

const Container = styled(ArkCombobox.Content, {
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

export type ComboboxContentProps = Omit<ComponentProps<typeof ArkCombobox.Content>, 'asChild'>;

export function ComboboxContent({ children, ...props }: ComboboxContentProps) {
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
