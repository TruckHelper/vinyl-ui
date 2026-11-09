'use client';

import { Collapsible as ArkCollapsible, useCollapsibleContext } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

const Container = styled(ArkCollapsible.Trigger, {
  base: {
    gridArea: 'trigger',
    display: {
      base: 'inline-flex',
      tablet: 'none',
    },
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.4rem',
    height: '2.4rem',
    fontSize: '2.4rem',
    color: 'text.default',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    '[data-background=transparent][data-state=closed] &': { color: 'text.default-light' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
  },
});

export type HeaderMenuTriggerProps = {
  'aria-label'?: string;
  className?: string;
};

export function HeaderMenuTrigger({
  'aria-label': ariaLabel = '메뉴',
  className,
}: HeaderMenuTriggerProps) {
  const { open } = useCollapsibleContext();

  return (
    <Container
      className={className}
      aria-label={ariaLabel}
    >
      <Icon name={open ? 'x' : 'text-align-end'} />
    </Container>
  );
}
