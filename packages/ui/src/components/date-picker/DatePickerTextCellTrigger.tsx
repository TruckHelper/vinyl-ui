'use client';

import type { ComponentProps, FC } from 'react';

import { DatePicker as ArkDatePicker } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

export type DatePickerTextCellTriggerProps = Omit<ComponentProps<typeof ArkDatePicker.TableCellTrigger>, 'asChild'>;

export const DatePickerTextCellTrigger = styled(ArkDatePicker.TableCellTrigger, {
  base: {
    textStyle: 'button.small-normal',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '4rem',
    borderRadius: '8',
    color: 'text.default',
    cursor: 'pointer',
    '&:hover:not([data-selected], [data-disabled])': {
      backgroundColor: 'layout.bg-light-gray',
    },
    '&[data-selected]': {
      backgroundColor: 'layout.primary-subtle',
      color: 'text.accent-primary',
    },
    '&[data-disabled]': {
      backgroundColor: 'layout.bg-disable',
      color: 'text.disable',
      cursor: 'not-allowed',
    },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '-2px',
    },
  },
}) as unknown as FC<DatePickerTextCellTriggerProps>;
