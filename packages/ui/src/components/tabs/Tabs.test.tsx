import type { ReactElement } from 'react';
import { useState } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { TabsType } from './TabsContext';

import { Tabs } from './Tabs';
import { TabsContent } from './TabsContent';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';

const context = describe;

type ControlledTabsProps = {
  initialValue?: string;
  type?: TabsType;
  onChangeValue?: ({ value }: { value: string }) => void;
};

function ControlledTabs({
  initialValue = 'a',
  type,
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
      <TabsList
        type={type}
        aria-label="메뉴"
      >
        <TabsTrigger value="a">첫째</TabsTrigger>
        <TabsTrigger value="b">둘째</TabsTrigger>
        <TabsTrigger
          value="c"
          disabled
        >
          셋째
        </TabsTrigger>
        <TabsTrigger value="d">넷째</TabsTrigger>
      </TabsList>
      <TabsContent value="a">첫째 내용</TabsContent>
      <TabsContent value="b">둘째 내용</TabsContent>
      <TabsContent value="c">셋째 내용</TabsContent>
      <TabsContent value="d">넷째 내용</TabsContent>
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

  it('selects the tab of value and shows only its panel', async () => {
    await renderTabs(<ControlledTabs initialValue="b" />);

    expect(screen.getByRole('tab', { name: '둘째' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: '첫째' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('둘째 내용');
    expect(screen.queryByText('첫째 내용')).not.toBeVisible();
  });

  context('without updating value', () => {
    it('keeps the selected tab', async () => {
      await renderTabs((
        <Tabs
          value="a"
          onChangeValue={handleChange}
        >
          <TabsList>
            <TabsTrigger value="a">첫째</TabsTrigger>
            <TabsTrigger value="b">둘째</TabsTrigger>
          </TabsList>
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
    it('calls onChangeValue and switches the panel', async () => {
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
    it('moves focus to the next tab', async () => {
      await renderTabs(<ControlledTabs />);

      const first = screen.getByRole('tab', { name: '첫째' });

      fireEvent.focus(first);
      fireEvent.keyDown(first, { key: 'ArrowRight' });

      await waitFor(() => expect(screen.getByRole('tab', { name: '둘째' })).toHaveFocus());
    });

    it('skips the disabled tab', async () => {
      await renderTabs(<ControlledTabs initialValue="b" />);

      const second = screen.getByRole('tab', { name: '둘째' });

      fireEvent.focus(second);
      fireEvent.keyDown(second, { key: 'ArrowRight' });

      await waitFor(() => expect(screen.getByRole('tab', { name: '넷째' })).toHaveFocus());
    });
  });

  context('when End is pressed', () => {
    it('moves focus to the last tab', async () => {
      await renderTabs(<ControlledTabs />);

      const first = screen.getByRole('tab', { name: '첫째' });

      fireEvent.focus(first);
      fireEvent.keyDown(first, { key: 'End' });

      await waitFor(() => expect(screen.getByRole('tab', { name: '넷째' })).toHaveFocus());
    });
  });

  context('when the tab is disabled', () => {
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

  context.each(['border', 'fill'] as const)('with %s type', (type) => {
    it('marks only the selected tab', async () => {
      await renderTabs(<ControlledTabs type={type} />);

      expect(screen.getByRole('tab', { name: '첫째' })).toHaveAttribute('data-selected');
      expect(screen.getByRole('tab', { name: '둘째' })).not.toHaveAttribute('data-selected');
    });
  });
});
