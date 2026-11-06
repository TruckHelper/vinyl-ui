'use client';

import { useState } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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
      <TabsList
        variant={variant}
        aria-label="주문 정보"
      >
        <TabsTrigger value="order">주문 내역</TabsTrigger>
        <TabsTrigger value="delivery">배송 현황</TabsTrigger>
        <TabsTrigger
          value="review"
          disabled={disabledItem}
        >
          리뷰
        </TabsTrigger>
      </TabsList>
      <TabsContent value="order">주문 내역 내용</TabsContent>
      <TabsContent value="delivery">배송 현황 내용</TabsContent>
      <TabsContent value="review">리뷰 내용</TabsContent>
    </Tabs>
  );
}
