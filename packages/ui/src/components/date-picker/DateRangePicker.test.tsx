import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';

import type { DateRangeValue } from './DateRangePicker';
import { DateRangePicker } from './DateRangePicker';

const context = describe;

describe('DateRangePicker', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderDateRangePicker(props: Partial<Parameters<typeof DateRangePicker>[0]> = {}) {
    return render((
      <DateRangePicker
        name="period"
        label="기간"
        value={['2026-11-10', '2026-11-14']}
        onChangeValue={handleChange}
        {...props}
      />
    ));
  }

  it('renders start and end values', () => {
    renderDateRangePicker();

    expect(screen.getByLabelText('기간 시작일')).toHaveValue('2026-11-10');
    expect(screen.getByLabelText('기간 종료일')).toHaveValue('2026-11-14');
  });

  it('listens for start and end date select events', async () => {
    function ControlledDateRangePicker() {
      const [value, setValue] = useState<DateRangeValue>(['2026-11-01', '2026-11-02']);

      return (
        <DateRangePicker
          name="period"
          label="기간"
          value={value}
          onChangeValue={(payload) => {
            handleChange(payload);
            setValue(payload.value);
          }}
        />
      );
    }

    render(<ControlledDateRangePicker />);

    const triggers = screen.getAllByRole('button', { name: '달력 열기' });

    expect(triggers).toHaveLength(2);

    fireEvent.click(triggers[0] as HTMLElement);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '월 선택으로 전환' })).toHaveTextContent('2026년 11월');
    });

    fireEvent.click(screen.getByText('10'));

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'period',
      value: ['2026-11-10', ''],
    }));

    fireEvent.click(screen.getByText('14'));

    await waitFor(() => expect(handleChange).toHaveBeenLastCalledWith({
      name: 'period',
      value: ['2026-11-10', '2026-11-14'],
    }));
  });

  context('without start date', () => {
    it('ignores end date', () => {
      renderDateRangePicker({ value: ['', '2026-11-14'] });

      expect(screen.getByLabelText('기간 시작일')).toHaveValue('');
      expect(screen.getByLabelText('기간 종료일')).toHaveValue('');
    });
  });

  context('with error message', () => {
    it('marks both inputs invalid', () => {
      renderDateRangePicker({ errorMessage: '기간을 확인해 주세요' });

      expect(screen.getByRole('alert')).toHaveTextContent('기간을 확인해 주세요');
      expect(screen.getByLabelText('기간 시작일')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('기간 종료일')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  context('when disabled', () => {
    it('disables both inputs', () => {
      renderDateRangePicker({ disabled: true });

      expect(screen.getByLabelText('기간 시작일')).toBeDisabled();
      expect(screen.getByLabelText('기간 종료일')).toBeDisabled();
    });
  });
});
