import { fireEvent, render, screen } from '@testing-library/react';

import { Input } from './Input';

describe('Input', () => {
  it('renders a textbox and listens for change events', () => {
    const handleChange = jest.fn();

    render((
      <Input
        placeholder="text"
        onChange={handleChange}
      />
    ));

    const input = screen.getByPlaceholderText('text');

    fireEvent.change(input, { target: { value: 'Hello, world!' } });

    expect(handleChange).toHaveBeenCalled();
  });
});
