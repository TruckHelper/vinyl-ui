'use client';

import { DatePicker as ArkDatePicker, useDatePickerContext } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Table = styled(ArkDatePicker.Table, {
  base: {
    width: '28rem',
    borderCollapse: 'collapse',
    borderSpacing: '0',
    tableLayout: 'fixed',
  },
});

const HeaderCell = styled(ArkDatePicker.TableHeader, {
  base: {
    textStyle: 'body.small-normal',
    width: '4rem',
    height: '4rem',
    padding: '0',
    color: 'text.soft',
    textAlign: 'center',
  },
});

const Cell = styled(ArkDatePicker.TableCell, {
  base: {
    padding: '0',
  },
});

const CellTrigger = styled(ArkDatePicker.TableCellTrigger, {
  base: {
    textStyle: 'button.small-normal',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4rem',
    height: '4rem',
    borderRadius: '8',
    color: 'text.default',
    cursor: 'pointer',
    '&:hover:not([data-selected], [data-in-range], [data-disabled])': {
      backgroundColor: 'layout.bg-light-gray',
    },
    '&[data-in-range]': {
      borderRadius: '0',
      backgroundColor: 'layout.primary-subtle',
      color: 'text.accent-primary',
    },
    '&[data-selected]': {
      backgroundColor: 'layout.primary',
      color: 'text.default-light',
    },
    '&[data-range-start]': {
      borderTopLeftRadius: '8',
      borderBottomLeftRadius: '8',
    },
    '&[data-range-end]': {
      borderTopRightRadius: '8',
      borderBottomRightRadius: '8',
    },
    '&[data-disabled]': {
      backgroundColor: 'transparent',
      color: 'text.disable',
      cursor: 'default',
    },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '-2px',
    },
  },
});

export function DatePickerDayTable() {
  const datePicker = useDatePickerContext();

  return (
    <Table>
      <ArkDatePicker.TableHead>
        <ArkDatePicker.TableRow>
          {datePicker.weekDays.map((weekDay) => (
            <HeaderCell key={weekDay.long}>
              {weekDay.narrow}
            </HeaderCell>
          ))}
        </ArkDatePicker.TableRow>
      </ArkDatePicker.TableHead>
      <ArkDatePicker.TableBody>
        {datePicker.weeks.map((week) => (
          <ArkDatePicker.TableRow key={week[0]?.toString()}>
            {week.map((day) => (
              <Cell
                key={day.toString()}
                value={day}
              >
                <CellTrigger>
                  {day.day}
                </CellTrigger>
              </Cell>
            ))}
          </ArkDatePicker.TableRow>
        ))}
      </ArkDatePicker.TableBody>
    </Table>
  );
}
