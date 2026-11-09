'use client';

import { type ComponentProps, useMemo, useState } from 'react';

import { Collapsible as ArkCollapsible } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { HeaderMenuContext } from './headerMenuContext';

const Container = styled(ArkCollapsible.Root, {
  base: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: {
      base: '1fr auto auto',
      tablet: '1fr auto 1fr',
    },
    gridTemplateAreas: {
      base: '"logo actions trigger"',
      tablet: '"logo nav actions"',
    },
    alignItems: 'center',
    columnGap: '16',
    width: '100%',
    minHeight: '7.2rem',
    paddingInline: '16',
    backgroundColor: 'layout.bg-light',
    transitionProperty: 'background-color',
    transitionDuration: '0.2s',
    '&[data-background=transparent]': { backgroundColor: 'transparent' },
    '&[data-background=transparent][data-state=open]': {
      backgroundColor: {
        base: 'layout.bg-light',
        tablet: 'transparent',
      },
    },
  },
});

export type HeaderBackground = 'white' | 'transparent';

export type HeaderProps = Omit<ComponentProps<'header'>, 'hidden'> & {
  background?: HeaderBackground;
};

export function Header({
  background = 'white',
  children,
  ...props
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  const menu = useMemo(() => ({ close: () => setOpen(false) }), []);

  return (
    <HeaderMenuContext.Provider value={menu}>
      <Container
        asChild
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <header
          {...props}
          data-background={background}
        >
          {children}
        </header>
      </Container>
    </HeaderMenuContext.Provider>
  );
}
