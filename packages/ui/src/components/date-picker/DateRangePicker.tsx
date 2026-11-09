'use client';

import type { DatePickerValueChangeDetails } from '@ark-ui/react';
import { useMemo } from 'react';

import { DatePicker as ArkDatePicker } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { ErrorMessage } from '../field/ErrorMessage';
import { Field } from '../field/Field';
import { Label } from '../field/Label';
import { createErrorId } from '../field/utils';

import { DatePickerCalendar } from './DatePickerCalendar';
import { DatePickerInputBox } from './DatePickerInputBox';
import {
  DATE_PICKER_LOCALE,
  DATE_PICKER_PLACEHOLDER,
  DATE_PICKER_POSITIONING,
  DATE_PICKER_TIME_ZONE,
  DATE_PICKER_TRANSLATIONS,
  formatDateValue,
  parseDateString,
  toDateValues,
} from './utils';

const Root = styled(ArkDatePicker.Root, {
  base: {
    width: '100%',
  },
});

const Control = styled(ArkDatePicker.Control, {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    width: '100%',
  },
});

const Separator = styled('span', {
  base: {
    textStyle: 'body.medium-light',
    flexShrink: 0,
    color: 'text.input',
  },
});

export type DateRangeValue = [string, string];

export type DateRangePickerProps = {
  name: string;
  value: DateRangeValue;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
  onChangeValue: ({ name, value }: {
    name: string;
    value: DateRangeValue;
  }) => void;
};

export function DateRangePicker({
  name,
  value,
  label,
  placeholder = DATE_PICKER_PLACEHOLDER,
  required = false,
  disabled = false,
  hasError = false,
  errorMessage,
  className,
  onChangeValue,
}: DateRangePickerProps) {
  const id = `input-${name}`;
  const resolvedHasError = hasError || !!errorMessage;
  const describedBy = errorMessage ? createErrorId(id) : undefined;

  const [start, end] = value;
  const dateValue = useMemo(() => toDateValues([start, end]), [start, end]);
  const [startValue, endValue] = dateValue.map(formatDateValue);

  const handleValueChange = (details: DatePickerValueChangeDetails) => {
    const [startDate, endDate] = details.value;

    onChangeValue({
      name,
      value: [
        startDate ? formatDateValue(startDate) : '',
        endDate ? formatDateValue(endDate) : '',
      ],
    });
  };

  return (
    <Field
      className={className}
      id={id}
      required={required}
      hasError={resolvedHasError}
      disabled={disabled}
    >
      {label ? (
        <Label>
          {label}
        </Label>
      ) : null}
      <Root
        ids={{
          input: (index) => (index === 0 ? id : `${id}-end`),
          trigger: `${id}-trigger`,
        }}
        selectionMode="range"
        name={name}
        value={dateValue}
        locale={DATE_PICKER_LOCALE}
        timeZone={DATE_PICKER_TIME_ZONE}
        translations={DATE_PICKER_TRANSLATIONS}
        placeholder={placeholder}
        positioning={DATE_PICKER_POSITIONING}
        required={required}
        disabled={disabled}
        invalid={resolvedHasError}
        format={formatDateValue}
        parse={parseDateString}
        onValueChange={handleValueChange}
      >
        <Control>
          <DatePickerInputBox
            index={0}
            value={startValue ?? ''}
            hasError={resolvedHasError}
            disabled={disabled}
            aria-label={label ? `${label} 시작일` : '시작일'}
            aria-describedby={describedBy}
          />
          <Separator aria-hidden>
            ~
          </Separator>
          <DatePickerInputBox
            index={1}
            value={endValue ?? ''}
            hasError={resolvedHasError}
            disabled={disabled}
            aria-label={label ? `${label} 종료일` : '종료일'}
            aria-describedby={describedBy}
            triggerId={`${id}-trigger-end`}
          />
        </Control>
        <DatePickerCalendar />
      </Root>
      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>
    </Field>
  );
}
