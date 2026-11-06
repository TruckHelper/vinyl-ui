'use client';

import { Dialog as ArkDialog } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

const Container = styled(ArkDialog.CloseTrigger, {
  base: {
    position: 'absolute',
    top: '16',
    right: '16',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.4rem',
    height: '2.4rem',
    padding: '0',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'text.default',
    fontSize: '2rem',
    cursor: 'pointer',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
  },
});

export type ModalCloseTriggerProps = {
  'aria-label'?: string;
  className?: string;
};

export function ModalCloseTrigger({
  'aria-label': ariaLabel = '닫기',
  className,
}: ModalCloseTriggerProps) {
  return (
    <Container
      className={className}
      aria-label={ariaLabel}
    >
      <Icon name="x" />
    </Container>
  );
}
