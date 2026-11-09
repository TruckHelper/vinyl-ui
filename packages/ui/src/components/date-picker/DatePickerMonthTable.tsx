'use client';

import { DatePicker as ArkDatePicker, useDatePickerContext } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { DatePickerTextCellTrigger } from './DatePickerTextCellTrigger';

const Table = styled(ArkDatePicker.Table, {
  base: {
    width: '28rem',
    borderCollapse: 'collapse',
    borderSpacing: '0',
    tableLayout: 'fixed',
  },
});

const Cell = styled(ArkDatePicker.TableCell, {
  base: {
    padding: '0',
  },
});

export function DatePickerMonthTable() {
  const datePicker = useDatePickerContext();

  return (
    <Table columns={4}>
      <ArkDatePicker.TableBody>
        {datePicker.getMonthsGrid({ columns: 4, format: 'short' }).map((months) => (
          <ArkDatePicker.TableRow key={months[0]?.value}>
            {months.map((month) => (
              <Cell
                key={month.value}
                value={month.value}
              >
                <DatePickerTextCellTrigger>
                  {month.label}
                </DatePickerTextCellTrigger>
              </Cell>
            ))}
          </ArkDatePicker.TableRow>
        ))}
      </ArkDatePicker.TableBody>
    </Table>
  );
}
