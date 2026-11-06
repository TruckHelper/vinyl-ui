'use client';

import { useState } from 'react';

import { RadioGroup, SelectionCard } from '@bigmobility/vinyl-ui/radio';

type SelectionCardDemoProps = {
  type?: 'center' | 'left';
  disabledItem?: boolean;
  initialValue?: string;
};

export default function SelectionCardDemo({
  type = 'center',
  disabledItem = false,
  initialValue = '',
}: SelectionCardDemoProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = ({ value: next }: { name: string; value: string }) => {
    setValue(next);
  };

  return (
    <RadioGroup
      name="member"
      value={value}
      aria-label="회원 유형"
      onChangeValue={handleChange}
    >
      <SelectionCard
        value="personal"
        type={type}
        title="개인 회원"
        description="화물을 보내는 개인 사용자"
      />
      <SelectionCard
        value="business"
        type={type}
        title="사업자 회원"
        description="사업자 등록증이 있는 사용자"
        icon="building-2"
        disabled={disabledItem}
      />
    </RadioGroup>
  );
}
