import type { DatePickerRootProps, DateValue } from '@ark-ui/react';
import { parseDate } from '@ark-ui/react';

type Translations = NonNullable<DatePickerRootProps['translations']>;

export const DATE_PICKER_LOCALE = 'ko-KR';

export const DATE_PICKER_TIME_ZONE = 'Asia/Seoul';

export const DATE_PICKER_PLACEHOLDER = 'YYYY-MM-DD';

export const DATE_PICKER_POSITIONING = {
  placement: 'bottom-end',
  gutter: 4,
} as const;

const padNumber = (value: number, length: number) => String(value).padStart(length, '0');

export function formatDateValue(date: DateValue) {
  return [
    padNumber(date.year, 4),
    padNumber(date.month, 2),
    padNumber(date.day, 2),
  ].join('-');
}

const DATE_STRING_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function toDateString(value: string) {
  const parts = value.trim().split(/\D+/).filter(Boolean);

  const [year, month, day] = parts;

  if (parts.length === 1 && year?.length === 8) {
    return `${year.slice(0, 4)}-${year.slice(4, 6)}-${year.slice(6, 8)}`;
  }

  if (parts.length !== 3 || year?.length !== 4 || !month || !day || month.length > 2 || day.length > 2) {
    return undefined;
  }

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function parseStrictDateString(text: string): DateValue | undefined {
  try {
    const date = parseDate(text);

    return formatDateValue(date) === text ? date : undefined;
  } catch {
    return undefined;
  }
}

export function parseDateString(value: string): DateValue | undefined {
  const text = toDateString(value);

  return text ? parseStrictDateString(text) : undefined;
}

export function parseValueString(value: string): DateValue | undefined {
  return DATE_STRING_PATTERN.test(value) ? parseStrictDateString(value) : undefined;
}

export function toDateValues(values: string[]) {
  const dates: DateValue[] = [];

  for (const value of values) {
    const date = parseValueString(value);

    if (!date) {
      break;
    }

    dates.push(date);
  }

  return dates;
}

const VIEW_NAMES = {
  day: '달',
  month: '연도',
  year: '10년',
} as const;

export const DATE_PICKER_TRANSLATIONS: Translations = {
  dayCell: (state) => {
    if (state.unavailable) {
      return `선택할 수 없음. ${state.valueText}`;
    }

    if (state.firstInRange) {
      return `시작일 ${state.valueText}`;
    }

    if (state.lastInRange) {
      return `종료일 ${state.valueText}`;
    }

    if (state.selected) {
      return `선택됨. ${state.valueText}`;
    }

    return state.valueText;
  },
  trigger: (open) => (open ? '달력 닫기' : '달력 열기'),
  viewTrigger: (view) => {
    if (view === 'day') {
      return '월 선택으로 전환';
    }

    return '연도 선택으로 전환';
  },
  prevTrigger: (view) => `이전 ${VIEW_NAMES[view]}`,
  nextTrigger: (view) => `다음 ${VIEW_NAMES[view]}`,
  presetTrigger: ([start = '', end = '']) => `${start} ~ ${end} 선택`,
  placeholder: () => ({
    year: 'YYYY',
    month: 'MM',
    day: 'DD',
  }),
  content: '달력',
  monthSelect: '월 선택',
  yearSelect: '연도 선택',
  clearTrigger: '선택한 날짜 지우기',
};
