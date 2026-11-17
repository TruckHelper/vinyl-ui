import type { ReactElement } from 'react';
import { useState } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { TabsVariant } from './TabsContext';

import { Tabs } from './Tabs';
import { TabPanel } from './TabPanel';
import { TabList } from './TabList';
import { Tab } from './Tab';

const context = describe;

type ControlledTabsProps = {
  initialValue?: string;
  variant?: TabsVariant;
  onChangeValue?: ({ value }: { value: string }) => void;
};

function ControlledTabs({
  initialValue = 'a',
  variant,
  onChangeValue,
}: ControlledTabsProps) {
  const [value, setValue] = useState(initialValue);

  const handleChangeValue = ({ value: next }: { value: string }) => {
    setValue(next);
    onChangeValue?.({ value: next });
  };

  return (
    <Tabs
      value={value}
      onChangeValue={handleChangeValue}
    >
      <TabList
        variant={variant}
        aria-label="메뉴"
      >
        <Tab value="a">첫째</Tab>
        <Tab value="b">둘째</Tab>
        <Tab
          value="c"
          disabled
        >
          셋째
        </Tab>
        <Tab value="d">넷째</Tab>
      </TabList>
      <TabPanel value="a">첫째 내용</TabPanel>
      <TabPanel value="b">둘째 내용</TabPanel>
      <TabPanel value="c">셋째 내용</TabPanel>
      <TabPanel value="d">넷째 내용</TabPanel>
    </Tabs>
  );
}

async function renderTabs(ui: ReactElement) {
  render(ui);

  await waitFor(() => {
    expect(screen.getAllByRole('tab')[0]).not.toHaveAttribute('data-ssr');
  });
}

describe('Tabs', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders labeled tablist and tabs', async () => {
    await renderTabs(<ControlledTabs />);

    expect(screen.getByRole('tablist', { name: '메뉴' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(4);
  });

  it('selects tab of value and shows only its panel', async () => {
    await renderTabs(<ControlledTabs initialValue="b" />);

    expect(screen.getByRole('tab', { name: '둘째' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: '첫째' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('둘째 내용');
    expect(screen.queryByText('첫째 내용')).not.toBeVisible();
  });

  context('without updating value', () => {
    it('keeps selected tab', async () => {
      await renderTabs((
        <Tabs
          value="a"
          onChangeValue={handleChange}
        >
          <TabList>
            <Tab value="a">첫째</Tab>
            <Tab value="b">둘째</Tab>
          </TabList>
        </Tabs>
      ));

      const tab = screen.getByRole('tab', { name: '둘째' });

      fireEvent.focus(tab);
      fireEvent.click(tab);

      await waitFor(() => expect(handleChange).toHaveBeenCalledWith({ value: 'b' }));
      expect(screen.getByRole('tab', { name: '첫째' })).toHaveAttribute('aria-selected', 'true');
      expect(tab).toHaveAttribute('aria-selected', 'false');
    });
  });

  context('when another tab is clicked', () => {
    it('calls onChangeValue and switches panel', async () => {
      await renderTabs(<ControlledTabs onChangeValue={handleChange} />);

      const tab = screen.getByRole('tab', { name: '둘째' });

      fireEvent.focus(tab);
      fireEvent.click(tab);

      await waitFor(() => expect(handleChange).toHaveBeenCalledWith({ value: 'b' }));
      expect(tab).toHaveAttribute('aria-selected', 'true');
      await waitFor(() => expect(screen.getByText('둘째 내용')).toBeVisible());
    });
  });

  context('when ArrowRight is pressed', () => {
    it('moves focus to next tab', async () => {
      await renderTabs(<ControlledTabs />);

      const first = screen.getByRole('tab', { name: '첫째' });

      fireEvent.focus(first);
      fireEvent.keyDown(first, { key: 'ArrowRight' });

      await waitFor(() => expect(screen.getByRole('tab', { name: '둘째' })).toHaveFocus());
    });

    it('skips disabled tab', async () => {
      await renderTabs(<ControlledTabs initialValue="b" />);

      const second = screen.getByRole('tab', { name: '둘째' });

      fireEvent.focus(second);
      fireEvent.keyDown(second, { key: 'ArrowRight' });

      await waitFor(() => expect(screen.getByRole('tab', { name: '넷째' })).toHaveFocus());
    });
  });

  context('when End is pressed', () => {
    it('moves focus to last tab', async () => {
      await renderTabs(<ControlledTabs />);

      const first = screen.getByRole('tab', { name: '첫째' });

      fireEvent.focus(first);
      fireEvent.keyDown(first, { key: 'End' });

      await waitFor(() => expect(screen.getByRole('tab', { name: '넷째' })).toHaveFocus());
    });
  });

  context('when tab is disabled', () => {
    it('ignores click', async () => {
      await renderTabs(<ControlledTabs onChangeValue={handleChange} />);

      const tab = screen.getByRole('tab', { name: '셋째' });

      expect(tab).toBeDisabled();

      fireEvent.focus(tab);
      fireEvent.click(tab);

      const next = screen.getByRole('tab', { name: '넷째' });

      fireEvent.focus(next);
      fireEvent.click(next);

      await waitFor(() => expect(handleChange).toHaveBeenCalledWith({ value: 'd' }));
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).not.toHaveBeenCalledWith({ value: 'c' });
      expect(tab).toHaveAttribute('aria-selected', 'false');
    });
  });

  context.each(['border', 'fill'] as const)('with %s variant', (variant) => {
    it('marks only selected tab', async () => {
      await renderTabs(<ControlledTabs variant={variant} />);

      expect(screen.getByRole('tab', { name: '첫째' })).toHaveAttribute('data-selected');
      expect(screen.getByRole('tab', { name: '둘째' })).not.toHaveAttribute('data-selected');
    });
  });
});
