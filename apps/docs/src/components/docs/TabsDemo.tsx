'use client';

import { useState } from 'react';

import {
  Tabs,
  TabPanel,
  TabList,
  Tab,
} from '@bigmobility/vinyl-ui/tabs';

type TabsDemoProps = {
  variant?: 'border' | 'fill';
  disabledItem?: boolean;
};

export default function TabsDemo({
  variant = 'border',
  disabledItem = false,
}: TabsDemoProps) {
  const [value, setValue] = useState('order');

  const handleChange = ({ value: next }: { value: string }) => {
    setValue(next);
  };

  return (
    <Tabs
      value={value}
      onChangeValue={handleChange}
    >
      <TabList
        variant={variant}
        aria-label="주문 정보"
      >
        <Tab value="order">주문 내역</Tab>
        <Tab value="delivery">배송 현황</Tab>
        <Tab
          value="review"
          disabled={disabledItem}
        >
          리뷰
        </Tab>
      </TabList>
      <TabPanel value="order">주문 내역 내용</TabPanel>
      <TabPanel value="delivery">배송 현황 내용</TabPanel>
      <TabPanel value="review">리뷰 내용</TabPanel>
    </Tabs>
  );
}
