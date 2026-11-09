'use client';

import { DatePicker as ArkDatePicker, useDatePickerContext } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { Icon } from '../icon/Icon';

const Container = styled(ArkDatePicker.ViewControl, {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

const PrevTrigger = styled(ArkDatePicker.PrevTrigger, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '4rem',
    height: '4rem',
    padding: '0',
    border: 'none',
    borderRadius: '8',
    backgroundColor: 'transparent',
    color: 'text.default',
    fontSize: '2rem',
    cursor: 'pointer',
    _hover: { backgroundColor: 'layout.bg-light-gray' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      backgroundColor: 'transparent',
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});

const NextTrigger = styled(ArkDatePicker.NextTrigger, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '4rem',
    height: '4rem',
    padding: '0',
    border: 'none',
    borderRadius: '8',
    backgroundColor: 'transparent',
    color: 'text.default',
    fontSize: '2rem',
    cursor: 'pointer',
    _hover: { backgroundColor: 'layout.bg-light-gray' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      backgroundColor: 'transparent',
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});

const ViewTrigger = styled(ArkDatePicker.ViewTrigger, {
  base: {
    textStyle: 'button.medium-normal',
    padding: '12',
    border: 'none',
    borderRadius: '8',
    backgroundColor: 'transparent',
    color: 'text.default',
    textAlign: 'center',
    cursor: 'pointer',
    _hover: { backgroundColor: 'layout.bg-light-gray' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      backgroundColor: 'transparent',
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});

export function DatePickerViewControl() {
  const datePicker = useDatePickerContext();

  const decade = datePicker.getDecade();
  const title = datePicker.view === 'year'
    ? `${decade.start}년 ~ ${decade.end}년`
    : datePicker.visibleRangeText.start;

  return (
    <Container>
      <PrevTrigger>
        <Icon name="chevron-left" />
      </PrevTrigger>
      <ViewTrigger>
        {title}
      </ViewTrigger>
      <NextTrigger>
        <Icon name="chevron-right" />
      </NextTrigger>
    </Container>
  );
}
