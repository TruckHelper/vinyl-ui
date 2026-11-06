'use client';

import { Checkbox as ArkCheckbox } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

const Container = styled(ArkCheckbox.Control, {
  base: {
    fontSize: '1.6rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '2.4rem',
    height: '2.4rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'layout.default-line',
    borderRadius: '4',
    backgroundColor: 'transparent',
    transitionProperty: 'background-color, border-color, color',
    transitionDuration: '0.2s',
    _hover: { borderColor: 'layout.highlight-line' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _checked: {
      borderColor: 'layout.default-line',
      backgroundColor: 'layout.primary',
      color: 'text.default-light',
      _hover: { borderColor: 'layout.default-line' },
    },
    _invalid: {
      borderColor: 'layout.issue-line',
      backgroundColor: 'layout.bg-issue',
      _hover: { borderColor: 'layout.issue-line' },
      _checked: {
        borderColor: 'layout.issue-line',
        backgroundColor: 'layout.bg-issue',
        color: 'text.issue',
        _hover: { borderColor: 'layout.issue-line' },
      },
      _disabled: {
        borderColor: 'layout.default-line',
        backgroundColor: 'layout.bg-disable',
        _hover: { borderColor: 'layout.default-line' },
        _checked: {
          borderColor: 'layout.default-line',
          backgroundColor: 'layout.bg-disable',
          color: 'text.disable',
          _hover: { borderColor: 'layout.default-line' },
        },
      },
    },
    _disabled: {
      borderColor: 'layout.default-line',
      backgroundColor: 'layout.bg-disable',
      _hover: { borderColor: 'layout.default-line' },
      _checked: {
        borderColor: 'layout.default-line',
        backgroundColor: 'layout.bg-disable',
        color: 'text.disable',
        _hover: { borderColor: 'layout.default-line' },
      },
    },
  },
});

const Indicator = styled(ArkCheckbox.Indicator, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    _hidden: { display: 'none' },
  },
});

export type CheckboxControlProps = {
  className?: string;
};

export function CheckboxControl({ className }: CheckboxControlProps) {
  return (
    <Container className={className}>
      <Indicator>
        <Icon name="check" />
      </Indicator>
    </Container>
  );
}
