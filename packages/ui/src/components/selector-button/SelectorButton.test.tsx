import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { SelectorButton } from './SelectorButton';
import { SelectorButtonGroup } from './SelectorButtonGroup';

const context = describe;

describe('SelectorButton', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('listens for button click event', () => {
    render((
      <SelectorButtonGroup
        name="size"
        value={['a']}
        onChangeValue={handleChange}
      >
        <SelectorButton value="a">가</SelectorButton>
        <SelectorButton value="b">나</SelectorButton>
      </SelectorButtonGroup>
    ));

    expect(screen.getByRole('radio', { name: '가' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '나' })).not.toBeChecked();
  });

  context('when selecting selected value again', () => {
    it('keeps selected value', async () => {
      render((
        <SelectorButtonGroup
          name="size"
          value={['a']}
          onChangeValue={handleChange}
        >
          <SelectorButton value="a">가</SelectorButton>
          <SelectorButton value="b">나</SelectorButton>
        </SelectorButtonGroup>
      ));

      fireEvent.click(screen.getByRole('radio', { name: '가' }));

      await waitFor(() => {
        expect(handleChange).not.toHaveBeenCalledWith({
          name: 'size',
          value: [],
        });
      });

      expect(screen.getByRole('radio', { name: '가' })).toBeChecked();
    });
  });

  context('with multiple', () => {
    it('selects multiple values', () => {
      render((
        <SelectorButtonGroup
          name="size"
          value={['a']}
          onChangeValue={handleChange}
          multiple
        >
          <SelectorButton value="a">가</SelectorButton>
          <SelectorButton value="b">나</SelectorButton>
        </SelectorButtonGroup>
      ));

      expect(screen.getByRole('button', { name: '가' })).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByRole('button', { name: '나' })).toHaveAttribute('aria-pressed', 'false');
    });

    it('deselects selected value', async () => {
      render((
        <SelectorButtonGroup
          name="size"
          value={['a']}
          onChangeValue={handleChange}
          multiple
        >
          <SelectorButton value="a">가</SelectorButton>
          <SelectorButton value="b">나</SelectorButton>
        </SelectorButtonGroup>
      ));

      fireEvent.click(screen.getByRole('button', { name: '가' }));

      await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
        name: 'size',
        value: [],
      }));
    });
  });

  context('when group is disabled', () => {
    it('disables selections', () => {
      render((
        <SelectorButtonGroup
          name="size"
          value={['a']}
          onChangeValue={handleChange}
          disabled
        >
          <SelectorButton value="a">가</SelectorButton>
          <SelectorButton value="b">나</SelectorButton>
        </SelectorButtonGroup>
      ));

      expect(screen.getByRole('radio', { name: '가' })).toBeDisabled();
      expect(screen.getByRole('radio', { name: '나' })).toBeDisabled();

      fireEvent.click(screen.getByRole('radio', { name: '나' }));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  context('when button is disabled', () => {
    it('disables selection', async () => {
      render((
        <SelectorButtonGroup
          name="size"
          value={['a']}
          onChangeValue={handleChange}
        >
          <SelectorButton value="a">가</SelectorButton>
          <SelectorButton
            value="b"
            disabled
          >
            나
          </SelectorButton>
          <SelectorButton value="c">다</SelectorButton>
        </SelectorButtonGroup>
      ));

      expect(screen.getByRole('radio', { name: '나' })).toBeDisabled();
      expect(screen.getByRole('radio', { name: '가' })).not.toBeDisabled();
      expect(screen.getByRole('radio', { name: '다' })).not.toBeDisabled();

      fireEvent.click(screen.getByRole('radio', { name: '나' }));

      expect(handleChange).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole('radio', { name: '다' }));

      await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
        name: 'size',
        value: ['c'],
      }));
    });
  });

  context('with error', () => {
    it('sets aria-invalid on the group', () => {
      render((
        <SelectorButtonGroup
          name="size"
          value={[]}
          onChangeValue={handleChange}
          aria-label="크기"
          hasError
        >
          <SelectorButton value="a">가</SelectorButton>
        </SelectorButtonGroup>
      ));

      expect(screen.getByLabelText('크기')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
