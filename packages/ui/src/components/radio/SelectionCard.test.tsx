import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { RadioGroup } from './RadioGroup';
import { SelectionCard } from './SelectionCard';

const context = describe;

describe('SelectionCard', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderSelectionCards({
    value = '',
    disabledValue,
  }: {
    value?: string;
    disabledValue?: string;
  } = {}) {
    render((
      <RadioGroup
        name="member"
        value={value}
        aria-label="회원 유형"
        onChangeValue={handleChange}
      >
        <SelectionCard
          value="personal"
          title="개인"
          description="개인 사용자"
          disabled={disabledValue === 'personal'}
        />
        <SelectionCard
          value="business"
          type="left"
          title="사업자"
          disabled={disabledValue === 'business'}
        />
      </RadioGroup>
    ));
  }

  it('renders title as name and description as description', () => {
    renderSelectionCards({ value: 'personal' });

    const radio = screen.getByRole('radio', { name: '개인' });

    expect(radio).toBeChecked();
    expect(radio).toHaveAccessibleDescription('개인 사용자');
    expect(screen.getByRole('radio', { name: '사업자' })).not.toBeChecked();
  });

  it('renders the default icon', () => {
    renderSelectionCards();

    expect(screen.getAllByTestId('icon')[0]).toHaveAttribute('data-name', 'user-round');
  });

  it('renders the given icon', () => {
    render((
      <RadioGroup
        name="member"
        value=""
        onChangeValue={handleChange}
      >
        <SelectionCard
          value="personal"
          title="개인"
          icon="user"
        />
      </RadioGroup>
    ));

    expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'user');
  });

  it('listens for click event', async () => {
    renderSelectionCards({ value: 'personal' });

    fireEvent.click(screen.getByText('사업자'));

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'member',
      value: 'business',
    }));
  });

  context('when disabled', () => {
    it('does not listen for click event', () => {
      renderSelectionCards({ disabledValue: 'business' });

      expect(screen.getByRole('radio', { name: '사업자' })).toBeDisabled();

      fireEvent.click(screen.getByText('사업자'));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});
