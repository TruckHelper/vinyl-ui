import { render, screen } from '@testing-library/react';

import { Field } from './Field';
import { InputGroup } from './InputGroup';

const context = describe;

describe('InputGroup', () => {
  it('renders children', () => {
    render((
      <InputGroup>
        <span>kg</span>
      </InputGroup>
    ));

    screen.getByText('kg');
  });

  context('without state', () => {
    it('exposes neither invalid nor disabled state', () => {
      render(<InputGroup data-testid="group" />);

      const group = screen.getByTestId('group');

      expect(group).not.toHaveAttribute('data-invalid');
      expect(group).not.toHaveAttribute('data-disabled');
    });
  });

  context('with state props', () => {
    it('exposes invalid and disabled state', () => {
      render((
        <InputGroup
          data-testid="group"
          hasError
          disabled
        />
      ));

      const group = screen.getByTestId('group');

      expect(group).toHaveAttribute('data-invalid');
      expect(group).toHaveAttribute('data-disabled');
    });
  });

  context('inside Field', () => {
    it('reads state from Field', () => {
      render((
        <Field
          hasError
          disabled
        >
          <InputGroup data-testid="group" />
        </Field>
      ));

      const group = screen.getByTestId('group');

      expect(group).toHaveAttribute('data-invalid');
      expect(group).toHaveAttribute('data-disabled');
    });

    it('prefers state props over Field', () => {
      render((
        <Field
          hasError
          disabled
        >
          <InputGroup
            data-testid="group"
            hasError={false}
            disabled={false}
          />
        </Field>
      ));

      const group = screen.getByTestId('group');

      expect(group).not.toHaveAttribute('data-invalid');
      expect(group).not.toHaveAttribute('data-disabled');
    });
  });
});
