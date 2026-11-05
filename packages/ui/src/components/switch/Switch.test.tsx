import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Switch } from './Switch';
import { SwitchControl } from './SwitchControl';
import { SwitchLabel } from './SwitchLabel';
import { SwitchThumb } from './SwitchThumb';

const context = describe;

describe('Switch', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders switch label', () => {
    render((
      <Switch
        name="alarm"
        checked={false}
        onChangeChecked={handleChange}
      >
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>알림 받기</SwitchLabel>
      </Switch>
    ));

    expect(screen.getByRole('switch', { name: '알림 받기' })).not.toBeChecked();
  });

  it('listens for click event', async () => {
    render((
      <Switch
        name="alarm"
        checked={false}
        onChangeChecked={handleChange}
      >
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>알림 받기</SwitchLabel>
      </Switch>
    ));

    fireEvent.click(screen.getByText('알림 받기'));

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({
      name: 'alarm',
      value: true,
    }));
  });

  context('when disabled', () => {
    it('does not listen for click event', () => {
      render((
        <Switch
          name="alarm"
          checked={false}
          disabled
          onChangeChecked={handleChange}
        >
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <SwitchLabel>알림 받기</SwitchLabel>
        </Switch>
      ));

      fireEvent.click(screen.getByText('알림 받기'));

      expect(screen.getByRole('switch')).toBeDisabled();

      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});
