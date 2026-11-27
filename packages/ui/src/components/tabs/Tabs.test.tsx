import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Tabs } from './Tabs';
import { TabPanel } from './TabPanel';
import { TabList } from './TabList';
import { Tab } from './Tab';

const context = describe;

describe('Tabs', () => {
  const tabs = [
    { label: 'first', value: 'first', disabled: false },
    { label: 'second', value: 'second', disabled: false },
    { label: 'third', value: 'third', disabled: true },
  ];

  const selectedTabValue = 'first';

  const handleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders tab list and panels', async () => {
    render((
      <Tabs
        value={selectedTabValue}
        onChangeValue={handleChange}
      >
        <TabList
          variant="border"
          aria-label="메뉴"
        >
          {tabs.map(({ label, value, disabled }) => (
            <Tab
              key={value}
              value={value}
              disabled={disabled}
            >
              {label}
            </Tab>
          ))}
        </TabList>
        <TabPanel value="a">첫째 내용</TabPanel>
        <TabPanel value="b">둘째 내용</TabPanel>
        <TabPanel value="c">셋째 내용</TabPanel>
      </Tabs>
    ));

    expect(screen.getByRole('tablist', { name: '메뉴' })).toBeInTheDocument();

    tabs.forEach(({ label, value }) => {
      screen.getByRole('tab', { name: label });
      screen.getByText(value);
    });
  });

  it('listens for tab click event', async () => {
    render((
      <Tabs
        value={selectedTabValue}
        onChangeValue={handleChange}
      >
        <TabList
          variant="border"
          aria-label="메뉴"
        >
          {tabs.map(({ label, value, disabled }) => (
            <Tab
              key={value}
              value={value}
              disabled={disabled}
            >
              {label}
            </Tab>
          ))}
        </TabList>
        <TabPanel value="a">첫째 내용</TabPanel>
        <TabPanel value="b">둘째 내용</TabPanel>
        <TabPanel value="c">셋째 내용</TabPanel>
      </Tabs>
    ));

    fireEvent.click(screen.getByRole('tab', { name: 'second' }));

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({ value: 'second' }));

  });

  context('when tab is disabled', () => {
    it('does not listen for tab click event', async () => {
      render((
        <Tabs
          value={selectedTabValue}
          onChangeValue={handleChange}
        >
          <TabList
            variant="border"
            aria-label="메뉴"
          >
            {tabs.map(({ label, value, disabled }) => (
              <Tab
                key={value}
                value={value}
                disabled={disabled}
              >
                {label}
              </Tab>
            ))}
          </TabList>
          <TabPanel value="a">첫째 내용</TabPanel>
          <TabPanel value="b">둘째 내용</TabPanel>
          <TabPanel value="c">셋째 내용</TabPanel>
        </Tabs>
      ));

      const tab = screen.getByRole('tab', { name: 'third' });

      expect(tab).toBeDisabled();

      fireEvent.focus(tab);
      fireEvent.click(tab);

      expect(handleChange).not.toHaveBeenCalledWith({ value: 'third' });
    });
  });
});
