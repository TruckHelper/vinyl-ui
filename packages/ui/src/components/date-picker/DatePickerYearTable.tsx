'use client';

import type { KeyboardEvent } from 'react';

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

export function DatePickerYearTable() {
  const datePicker = useDatePickerContext();

  const handleKeyDown = (event: KeyboardEvent<HTMLTableElement>) => {
    const { end } = datePicker.getDecade();

    if (event.key !== 'End' || end === undefined) {
      return;
    }

    event.preventDefault();
    datePicker.focusYear(end);

    const table = event.currentTarget;

    requestAnimationFrame(() => {
      table.querySelector<HTMLElement>(`[data-part=table-cell-trigger][data-value="${end}"]`)?.focus();
    });
  };

  return (
    <Table
      columns={4}
      onKeyDown={handleKeyDown}
    >
      <ArkDatePicker.TableBody>
        {datePicker.getYearsGrid({ columns: 4 }).map((years) => (
          <ArkDatePicker.TableRow key={years[0]?.value}>
            {years.map((year) => (
              <Cell
                key={year.value}
                value={year.value}
              >
                <DatePickerTextCellTrigger>
                  {year.label}
                </DatePickerTextCellTrigger>
              </Cell>
            ))}
          </ArkDatePicker.TableRow>
        ))}
      </ArkDatePicker.TableBody>
    </Table>
  );
}
