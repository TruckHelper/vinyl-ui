import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { PasswordField } from './PasswordField';

const context = describe;

describe('PasswordField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleChangeValue = jest.fn();

  function renderPasswordField(props: Partial<Parameters<typeof PasswordField>[0]> = {}) {
    render((
      <PasswordField
        label="password"
        name="password"
        value=""
        onChangeValue={handleChangeValue}
        {...props}
      />
    ));
  }

  it('renders a masked input with label and placeholder', () => {
    renderPasswordField({ placeholder: 'Enter password' });

    const input = screen.getByLabelText('password');

    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('placeholder', 'Enter password');
    expect(input).toHaveAttribute('name', 'password');
  });

  context('when the value changes', () => {
    it('calls onChangeValue with name and value', () => {
      renderPasswordField();

      fireEvent.change(screen.getByLabelText('password'), {
        target: { value: 'secret' },
      });

      expect(handleChangeValue).toHaveBeenCalledWith({
        name: 'password',
        value: 'secret',
      });
    });
  });

  context('when the toggle is clicked', () => {
    it('shows and hides the password', async () => {
      renderPasswordField();

      const toggle = screen.getByRole('button', { name: '비밀번호 보기' });

      expect(toggle).toHaveAttribute('aria-pressed', 'false');

      fireEvent.click(toggle);

      await waitFor(() => {
        expect(screen.getByLabelText('password')).toHaveAttribute('type', 'text');
      });
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'eye');

      fireEvent.click(toggle);

      await waitFor(() => {
        expect(screen.getByLabelText('password')).toHaveAttribute('type', 'password');
      });
      expect(toggle).toHaveAttribute('aria-pressed', 'false');
      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'eye-off');
    });
  });

  context('when using the keyboard', () => {
    it('keeps the toggle in the tab order', () => {
      renderPasswordField();

      const toggle = screen.getByRole('button', { name: '비밀번호 보기' });

      expect(toggle).not.toHaveAttribute('tabindex', '-1');

      toggle.focus();

      expect(toggle).toHaveFocus();
    });

    it.each(['Enter', ' '])('toggles the password with %p key', async (key) => {
      renderPasswordField();

      const toggle = screen.getByRole('button', { name: '비밀번호 보기' });

      fireEvent.keyDown(toggle, { key });

      await waitFor(() => {
        expect(screen.getByLabelText('password')).toHaveAttribute('type', 'text');
      });
      expect(toggle).toHaveAttribute('aria-pressed', 'true');

      fireEvent.keyDown(toggle, { key });

      await waitFor(() => {
        expect(screen.getByLabelText('password')).toHaveAttribute('type', 'password');
      });
    });
  });

  context('when the form is submitted', () => {
    it('hides the password again', async () => {
      render((
        <form onSubmit={(event) => event.preventDefault()}>
          <PasswordField
            label="password"
            name="password"
            value="secret"
            onChangeValue={handleChangeValue}
          />
        </form>
      ));

      fireEvent.click(screen.getByRole('button', { name: '비밀번호 보기' }));

      await waitFor(() => {
        expect(screen.getByLabelText('password')).toHaveAttribute('type', 'text');
      });

      fireEvent.submit(screen.getByLabelText('password').closest('form') as HTMLFormElement);

      await waitFor(() => {
        expect(screen.getByLabelText('password')).toHaveAttribute('type', 'password');
      });
      expect(screen.getByRole('button', { name: '비밀번호 보기' })).toHaveAttribute('aria-pressed', 'false');
    });
  });

  context('with toggleLabel', () => {
    it('uses it as the toggle name', () => {
      renderPasswordField({ toggleLabel: 'Show password' });

      screen.getByRole('button', { name: 'Show password' });
    });
  });

  context('when disabled', () => {
    it('disables the input and the toggle', () => {
      renderPasswordField({ disabled: true });

      expect(screen.getByLabelText('password')).toBeDisabled();
      expect(screen.getByRole('button', { name: '비밀번호 보기' })).toBeDisabled();
    });
  });

  context('when required', () => {
    it('marks the input as required', () => {
      renderPasswordField({ required: true });

      expect(screen.getByLabelText('password')).toBeRequired();
    });
  });

  context('with error', () => {
    it('renders error message and marks the input as invalid', () => {
      renderPasswordField({
        hasError: true,
        errorMessage: 'ERROR',
      });

      screen.getByText('ERROR');

      expect(screen.getByLabelText('password')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('password')).toHaveAttribute('aria-describedby', 'input-password-error');
    });

    it('treats errorMessage alone as an error', () => {
      renderPasswordField({ errorMessage: 'ERROR' });

      screen.getByText('ERROR');

      expect(screen.getByLabelText('password')).toHaveAttribute('aria-invalid', 'true');
    });

    it('marks the input as invalid with hasError alone', () => {
      renderPasswordField({ hasError: true });

      expect(screen.getByLabelText('password')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
