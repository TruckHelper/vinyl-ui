import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DatePicker } from './DatePicker';

const context = describe;

describe('DatePicker', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderDatePicker(props: Partial<Parameters<typeof DatePicker>[0]> = {}) {
    return render((
      <DatePicker
        name="startDate"
        label="시작일"
        value="2026-11-06"
        onChangeValue={handleChange}
        {...props}
      />
    ));
  }

  it('renders value as YYYY-MM-DD', () => {
    renderDatePicker();

    expect(screen.getByLabelText('시작일')).toHaveValue('2026-11-06');
  });

  it('renders placeholder when value is empty', () => {
    renderDatePicker({ value: '' });

    expect(screen.getByLabelText('시작일')).toHaveAttribute('placeholder', 'YYYY-MM-DD');
  });

  it('renders korean weekdays and month', async () => {
    renderDatePicker();

    fireEvent.click(screen.getByRole('button', { name: '달력 열기' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '월 선택으로 전환' })).toHaveTextContent('2026년 11월');
    });

    const weekdays = screen.getAllByRole('columnheader', { hidden: true }).map((header) => header.textContent);

    expect(weekdays).toEqual(['일', '월', '화', '수', '목', '금', '토']);
  });

  it('listens for day select event', async () => {
    renderDatePicker();

    fireEvent.click(screen.getByRole('button', { name: '달력 열기' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '월 선택으로 전환' })).toHaveTextContent('2026년 11월');
    });

    fireEvent.click(screen.getByText('15'));

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'startDate',
      value: '2026-11-15',
    }));
  });

  it('listens for typed date with Enter key', async () => {
    renderDatePicker({ value: '' });

    const input = screen.getByLabelText('시작일');

    fireEvent.focus(input);
    fireEvent.input(input, { target: { value: '20261225' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'startDate',
      value: '2026-12-25',
    }));
  });

  it('pads one digit month and day of typed date', async () => {
    renderDatePicker({ value: '' });

    const input = screen.getByLabelText('시작일');

    fireEvent.focus(input);
    fireEvent.input(input, { target: { value: '2026.1.6' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'startDate',
      value: '2026-01-06',
    }));
  });

  context('with unparsable typed date', () => {
    it('does not select any date with Enter key', async () => {
      renderDatePicker();

      const input = screen.getByLabelText('시작일');

      fireEvent.focus(input);
      fireEvent.input(input, { target: { value: '202616' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('restores previous value on blur', async () => {
      renderDatePicker();

      const input = screen.getByLabelText('시작일');

      fireEvent.focus(input);
      fireEvent.input(input, { target: { value: '202616' } });
      fireEvent.blur(input);

      await waitFor(() => expect(input).toHaveValue('2026-11-06'));

      const values = handleChange.mock.calls.map(([payload]) => payload.value);

      expect(values.every((value) => value === '2026-11-06')).toBe(true);
    });

    it('keeps empty value on blur', async () => {
      renderDatePicker({ value: '' });

      const input = screen.getByLabelText('시작일');

      fireEvent.focus(input);
      fireEvent.input(input, { target: { value: '202616' } });
      fireEvent.blur(input);

      await waitFor(() => expect(input).toHaveValue(''));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  context('with keyboard', () => {
    async function openCalendar() {
      fireEvent.click(screen.getByRole('button', { name: '달력 열기' }));

      await waitFor(() => expect(document.activeElement).toHaveTextContent(/^6$/));
    }

    it('selects next day with ArrowRight and Enter keys', async () => {
      renderDatePicker();

      await openCalendar();

      fireEvent.keyDown(document.activeElement as Element, { key: 'ArrowRight' });

      await waitFor(() => expect(document.activeElement).toHaveTextContent(/^7$/));

      fireEvent.keyDown(document.activeElement as Element, { key: 'Enter' });

      await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
        name: 'startDate',
        value: '2026-11-07',
      }));
    });

    it('closes calendar with Escape key and focuses trigger', async () => {
      renderDatePicker();

      await openCalendar();

      fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });

      await waitFor(() => expect(screen.getByRole('button', { name: '달력 열기' })).toHaveFocus());

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('focuses last year in view with End key on year view', async () => {
      renderDatePicker();

      await openCalendar();

      fireEvent.click(screen.getByRole('button', { name: '월 선택으로 전환' }));

      await waitFor(() => expect(screen.getByRole('button', { name: '연도 선택으로 전환' })).toHaveTextContent('2026년'));

      fireEvent.click(screen.getByRole('button', { name: '연도 선택으로 전환' }));

      await waitFor(() => expect(screen.getByRole('button', { name: '연도 선택으로 전환' })).toHaveTextContent('2020년 ~ 2029년'));
      await waitFor(() => expect(document.activeElement).toHaveTextContent(/^2026$/));

      fireEvent.keyDown(document.activeElement as Element, { key: 'End' });

      await waitFor(() => expect(document.activeElement).toHaveTextContent(/^2029$/));
    });
  });

  context('with invalid value', () => {
    it.each(['2026-13-40', '2026-1-6', '20261106', '2026.11.06'])('renders empty input for %s', (value) => {
      renderDatePicker({ value });

      expect(screen.getByLabelText('시작일')).toHaveValue('');
    });
  });

  context('with error message', () => {
    it('renders error message and marks input invalid', () => {
      renderDatePicker({ errorMessage: '날짜를 선택해 주세요' });

      expect(screen.getByRole('alert')).toHaveTextContent('날짜를 선택해 주세요');
      expect(screen.getByLabelText('시작일')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('시작일')).toHaveAttribute('aria-describedby', 'input-startDate-error');
    });
  });

  context('with hasError', () => {
    it('marks input invalid without message', () => {
      renderDatePicker({ hasError: true });

      expect(screen.getByLabelText('시작일')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  context('when disabled', () => {
    it('disables input and trigger', () => {
      renderDatePicker({ disabled: true });

      expect(screen.getByLabelText('시작일')).toBeDisabled();
      expect(screen.getByRole('button', { name: '달력 열기' })).toBeDisabled();
    });
  });

  context('when required', () => {
    it('marks input required', () => {
      renderDatePicker({ required: true });

      expect(screen.getByLabelText('시작일')).toBeRequired();
    });
  });
});
