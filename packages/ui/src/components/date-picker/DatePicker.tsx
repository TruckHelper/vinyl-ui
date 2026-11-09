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
    width: '100%',
  },
});

export type DatePickerProps = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
  onChangeValue: ({ name, value }: {
    name: string;
    value: string;
  }) => void;
};

export function DatePicker({
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
}: DatePickerProps) {
  const id = `input-${name}`;
  const resolvedHasError = hasError || !!errorMessage;

  const dateValue = useMemo(() => toDateValues([value]), [value]);
  const [date] = dateValue;

  const handleValueChange = (details: DatePickerValueChangeDetails) => {
    const [nextDate] = details.value;

    onChangeValue({
      name,
      value: nextDate ? formatDateValue(nextDate) : '',
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
        ids={{ input: () => id }}
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
            value={date ? formatDateValue(date) : ''}
            hasError={resolvedHasError}
            disabled={disabled}
            aria-describedby={errorMessage ? createErrorId(id) : undefined}
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
