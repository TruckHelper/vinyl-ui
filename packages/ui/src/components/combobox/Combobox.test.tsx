import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { ComboboxItemData } from './Combobox';
import { Combobox } from './Combobox';
import { ComboboxContent } from './ComboboxContent';
import { ComboboxControl } from './ComboboxControl';
import { ComboboxGroup } from './ComboboxGroup';
import { ComboboxGroupLabel } from './ComboboxGroupLabel';
import { ComboboxInput } from './ComboboxInput';
import { ComboboxItem } from './ComboboxItem';
import { ComboboxItemText } from './ComboboxItemText';

const context = describe;

const REGIONS: ComboboxItemData[] = [
  { label: '서울', value: 'seoul', group: '수도권' },
  { label: '인천', value: 'incheon', group: '수도권' },
  { label: '부산', value: 'busan', group: '경상권' },
  { label: '대구 (준비 중)', value: 'daegu', group: '경상권', disabled: true },
];

describe('Combobox', () => {
  const handleChange = jest.fn();

  beforeAll(() => {
    globalThis.ResizeObserver ??= class {
      observe() {}

      unobserve() {}

      disconnect() {}
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderCombobox({
    value = [],
    disabled = false,
    hasError = false,
    multiple = false,
  }: {
    value?: string[];
    disabled?: boolean;
    hasError?: boolean;
    multiple?: boolean;
  } = {}) {
    return render((
      <Combobox
        items={REGIONS}
        name="region"
        value={value}
        disabled={disabled}
        hasError={hasError}
        multiple={multiple}
        onChangeValue={handleChange}
      >
        <ComboboxControl>
          <ComboboxInput placeholder="지역 검색" />
        </ComboboxControl>
        <ComboboxContent>
          {REGIONS.map((item) => (
            <ComboboxItem
              key={item.value}
              item={item}
            >
              <ComboboxItemText>{item.label}</ComboboxItemText>
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </Combobox>
    ));
  }

  it('renders input with placeholder', () => {
    renderCombobox();

    expect(screen.getByRole('combobox')).toHaveAttribute('placeholder', '지역 검색');
  });

  it('shows label of selected value in input', async () => {
    renderCombobox({ value: ['busan'] });

    await waitFor(() => expect(screen.getByRole('combobox')).toHaveValue('부산'));
  });

  it('opens options when input is clicked', async () => {
    renderCombobox();

    fireEvent.click(screen.getByRole('combobox'));

    await waitFor(() => expect(screen.getByRole('option', { name: '서울' })).toBeVisible());
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('filters options by typed text', async () => {
    renderCombobox();

    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '부' } });

    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1));
    expect(screen.getByRole('option', { name: '부산' })).toBeInTheDocument();
  });

  it('listens for option click event', async () => {
    renderCombobox();

    fireEvent.click(screen.getByRole('combobox'));

    await waitFor(() => expect(screen.getByRole('option', { name: '인천' })).toBeVisible());

    fireEvent.click(screen.getByRole('option', { name: '인천' }));

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'region',
      value: ['incheon'],
    }));
  });

  it('selects highlighted option with keyboard', async () => {
    renderCombobox();

    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '인' } });

    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1));

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'region',
      value: ['incheon'],
    }));
  });

  it('shows all options again when reopened after selection', async () => {
    renderCombobox({ value: ['busan'] });

    fireEvent.click(screen.getByRole('combobox'));

    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(4));
  });

  it('renders only matching options inside their group', async () => {
    render((
      <Combobox
        items={REGIONS}
        name="region"
        value={[]}
        onChangeValue={handleChange}
      >
        <ComboboxControl>
          <ComboboxInput />
        </ComboboxControl>
        <ComboboxContent>
          {['수도권', '경상권'].map((group) => (
            <ComboboxGroup key={group}>
              <ComboboxGroupLabel>{group}</ComboboxGroupLabel>
              {REGIONS.filter((item) => item.group === group).map((item) => (
                <ComboboxItem
                  key={item.value}
                  item={item}
                >
                  <ComboboxItemText>{item.label}</ComboboxItemText>
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          ))}
        </ComboboxContent>
      </Combobox>
    ));

    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '서' } });

    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1));
    expect(screen.getByText('수도권')).toBeInTheDocument();
  });

  it('toggles expanded state when opened and closed', async () => {
    renderCombobox();

    const input = screen.getByRole('combobox');

    expect(input).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(input);

    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));

    fireEvent.click(screen.getByRole('button', { name: '목록 열기' }));

    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'));
  });

  it('closes options with Escape key', async () => {
    renderCombobox();

    const input = screen.getByRole('combobox');

    fireEvent.click(input);

    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));

    await waitFor(() => {
      fireEvent.keyDown(input, { key: 'Escape' });
      expect(input).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('collapses options when nothing matches typed text', async () => {
    renderCombobox();

    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '부' } });

    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));

    fireEvent.change(input, { target: { value: '없는 지역' } });

    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'));

    fireEvent.change(input, { target: { value: '서' } });

    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));
    expect(screen.getAllByRole('option')).toHaveLength(1);
  });

  it('labels trigger in Korean', () => {
    renderCombobox();

    expect(screen.getByRole('button', { name: '목록 열기' })).toBeInTheDocument();
  });

  context('when multiple', () => {
    it('keeps previous value when another option is selected after filtering', async () => {
      renderCombobox({
        value: ['seoul'],
        multiple: true,
      });

      const input = screen.getByRole('combobox');

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: '부' } });

      await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1));

      fireEvent.click(screen.getByRole('option', { name: '부산' }));

      await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
        name: 'region',
        value: ['seoul', 'busan'],
      }));
    });
  });

  context('when option is disabled', () => {
    it('does not listen for click event', async () => {
      renderCombobox();

      fireEvent.click(screen.getByRole('combobox'));

      await waitFor(() => expect(screen.getByRole('option', { name: '대구 (준비 중)' })).toBeVisible());

      fireEvent.click(screen.getByRole('option', { name: '대구 (준비 중)' }));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  context('when disabled', () => {
    it('disables input', () => {
      renderCombobox({ disabled: true });

      expect(screen.getByRole('combobox')).toBeDisabled();
    });
  });

  context('when has error', () => {
    it('marks input as invalid', () => {
      renderCombobox({ hasError: true });

      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
