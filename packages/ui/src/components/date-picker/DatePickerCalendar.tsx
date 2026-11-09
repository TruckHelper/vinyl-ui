'use client';

import { DatePicker as ArkDatePicker, Portal } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { DatePickerDayTable } from './DatePickerDayTable';
import { DatePickerMonthTable } from './DatePickerMonthTable';
import { DatePickerViewControl } from './DatePickerViewControl';
import { DatePickerYearTable } from './DatePickerYearTable';

const Content = styled(ArkDatePicker.Content, {
  base: {
    zIndex: 'dropdown',
    padding: '16',
    border: '1px solid',
    borderColor: 'layout.default-line',
    borderRadius: '16',
    backgroundColor: 'layout.bg-light',
    boxShadow: 'floating',
    outline: 'none',
  },
});

const View = styled(ArkDatePicker.View, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    _hidden: { display: 'none' },
  },
});

export function DatePickerCalendar() {
  return (
    <Portal>
      <ArkDatePicker.Positioner>
        <Content>
          <View view="day">
            <DatePickerViewControl />
            <DatePickerDayTable />
          </View>
          <View view="month">
            <DatePickerViewControl />
            <DatePickerMonthTable />
          </View>
          <View view="year">
            <DatePickerViewControl />
            <DatePickerYearTable />
          </View>
        </Content>
      </ArkDatePicker.Positioner>
    </Portal>
  );
}
