import { fireEvent, render, screen } from '@testing-library/react';

import { VerificationCodeField } from './VerificationCodeField';

const context = describe;

describe('VerificationCodeField', () => {
  const handleChangeValue = jest.fn();
  const handleClickButton = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  type RenderOptions = {
    remainingTime?: string;
    hasError?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    buttonDisabled?: boolean;
  };

  function renderField(options: RenderOptions = {}) {
    return render((
      <VerificationCodeField
        name="code"
        label="인증번호"
        value=""
        placeholder="인증번호 6자리"
        buttonLabel="재전송"
        onChangeValue={handleChangeValue}
        onClickButton={handleClickButton}
        {...options}
      />
    ));
  }

  it('renders label, input and button', () => {
    renderField();

    expect(screen.getByLabelText('인증번호')).toHaveAttribute('placeholder', '인증번호 6자리');
    expect(screen.getByLabelText('인증번호')).toHaveAttribute('inputmode', 'numeric');
    expect(screen.getByLabelText('인증번호')).toHaveAttribute('autocomplete', 'one-time-code');
    expect(screen.getByRole('button', { name: '재전송' })).toBeInTheDocument();
  });

  it('listens for value change event', () => {
    renderField();

    fireEvent.change(screen.getByLabelText('인증번호'), {
      target: { value: '123456' },
    });

    expect(handleChangeValue).toHaveBeenCalledWith({
      name: 'code',
      value: '123456',
    });
  });

  it('listens for button click event', () => {
    renderField();

    fireEvent.click(screen.getByRole('button', { name: '재전송' }));

    expect(handleClickButton).toHaveBeenCalledTimes(1);
  });

  it('does not submit the form when clicking the button', () => {
    const handleSubmit = jest.fn((event: { preventDefault: () => void }) => event.preventDefault());

    render((
      <form onSubmit={handleSubmit}>
        <VerificationCodeField
          name="code"
          label="인증번호"
          value=""
          buttonLabel="재전송"
          onChangeValue={handleChangeValue}
          onClickButton={handleClickButton}
        />
      </form>
    ));

    fireEvent.click(screen.getByRole('button', { name: '재전송' }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('places the button after the input in tab order', () => {
    renderField();

    const input = screen.getByLabelText('인증번호');
    const button = screen.getByRole('button', { name: '재전송' });

    expect(input.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(button).not.toHaveAttribute('tabindex');

    button.focus();

    expect(button).toHaveFocus();
  });

  context('with remaining time', () => {
    it('renders remaining time and describes the input with it', () => {
      renderField({ remainingTime: '02:59' });

      expect(screen.getByRole('timer')).toHaveTextContent('남은 시간 02:59');
      expect(screen.getByLabelText('인증번호')).toHaveAccessibleDescription('남은 시간 02:59');
    });
  });

  context('without remaining time', () => {
    it('renders no timer', () => {
      renderField();

      expect(screen.queryByRole('timer')).not.toBeInTheDocument();
    });
  });

  context('with error', () => {
    it('renders error message and marks the input invalid', () => {
      renderField({
        hasError: true,
        errorMessage: '인증번호가 일치하지 않습니다',
        remainingTime: '01:00',
      });

      expect(screen.getByRole('alert')).toHaveTextContent('인증번호가 일치하지 않습니다');
      expect(screen.getByLabelText('인증번호')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('인증번호')).toHaveAccessibleDescription('인증번호가 일치하지 않습니다 남은 시간 01:00');
    });
  });

  context('with only errorMessage', () => {
    it('renders error message and marks the input invalid', () => {
      renderField({ errorMessage: '인증번호가 일치하지 않습니다' });

      expect(screen.getByRole('alert')).toHaveTextContent('인증번호가 일치하지 않습니다');
      expect(screen.getByLabelText('인증번호')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  context('without error', () => {
    it('renders no error message', () => {
      renderField();

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByLabelText('인증번호')).not.toHaveAttribute('aria-invalid');
    });
  });

  context('when disabled', () => {
    it('disables the input only', () => {
      renderField({ disabled: true });

      expect(screen.getByLabelText('인증번호')).toBeDisabled();
      expect(screen.getByRole('button', { name: '재전송' })).toBeEnabled();
    });
  });

  context('when button is disabled', () => {
    it('disables the button', () => {
      renderField({ buttonDisabled: true });

      expect(screen.getByRole('button', { name: '재전송' })).toBeDisabled();
      expect(screen.getByLabelText('인증번호')).toBeEnabled();
    });
  });
});
