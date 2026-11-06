'use client';

import type { FocusEvent, KeyboardEvent } from 'react';

import { DatePicker as ArkDatePicker, useDatePickerContext } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

import { parseDateString } from './utils';

const Container = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    flex: '1 0 0',
    minWidth: 0,
    paddingInline: '12',
    height: 'input-height',
    border: '1px solid',
    borderColor: 'layout.default-line',
    borderRadius: '8',
    backgroundColor: 'layout.bg-light',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    _hover: { borderColor: 'layout.strong-line' },
    _focusWithin: { borderColor: 'layout.strong-line' },
    '&[data-state=open]': { borderColor: 'layout.strong-line' },
    '&[data-invalid]': {
      backgroundColor: 'layout.bg-issue',
      borderColor: 'layout.issue-line',
      _hover: { borderColor: 'layout.issue-line' },
      _focusWithin: { borderColor: 'layout.issue-line' },
      '&[data-state=open]': { borderColor: 'layout.issue-line' },
    },
    '&[data-disabled]': {
      backgroundColor: 'layout.bg-disable',
      borderColor: 'layout.default-line',
      cursor: 'not-allowed',
      _hover: { borderColor: 'layout.default-line' },
    },
  },
});

const Input = styled(ArkDatePicker.Input, {
  base: {
    textStyle: 'input.medium-light',
    flex: '1 0 0',
    minWidth: 0,
    height: '100%',
    padding: '0',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'text.input',
    outline: 'none',
    _placeholder: { color: 'text.input-soft' },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});

const Trigger = styled(ArkDatePicker.Trigger, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: '0',
    border: 'none',
    borderRadius: '4',
    backgroundColor: 'transparent',
    color: 'text.input-soft',
    fontSize: '2rem',
    cursor: 'pointer',
    '*:is(:hover, :focus-within, [data-state=open]):not([data-invalid], [data-disabled]) > &': {
      color: 'text.input',
    },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: { cursor: 'not-allowed' },
  },
});

export type DatePickerInputBoxProps = {
  index: number;
  value: string;
  hasError: boolean;
  disabled: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  triggerId?: string;
};

function isUnparsable(text: string) {
  const trimmed = text.trim();

  return trimmed !== '' && !parseDateString(trimmed);
}

export function DatePickerInputBox({
  index,
  value,
  hasError,
  disabled,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  triggerId,
}: DatePickerInputBoxProps) {
  const datePicker = useDatePickerContext();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isUnparsable(event.currentTarget.value)) {
      event.preventDefault();
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (isUnparsable(event.currentTarget.value)) {
      event.currentTarget.value = value;
    }
  };

  return (
    <Container
      data-state={datePicker.open ? 'open' : 'closed'}
      data-invalid={hasError ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
    >
      <Input
        index={index}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <Trigger id={triggerId}>
        <Icon name="calendar" />
      </Trigger>
    </Container>
  );
}
