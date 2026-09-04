'use client';

import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectControl,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from '@bigmobility/vinyl-ui/select';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '100%',
    maxWidth: '32rem',
  },
});

const REGIONS = [
  { label: '서울', value: 'seoul' },
  { label: '부산', value: 'busan' },
  { label: '대구', value: 'daegu' },
  { label: '인천 (준비 중)', value: 'incheon', disabled: true },
];

const GROUPED_REGIONS = [
  { label: '서울', value: 'seoul', group: '수도권' },
  { label: '인천', value: 'incheon', group: '수도권' },
  { label: '부산', value: 'busan', group: '경상권' },
  { label: '대구', value: 'daegu', group: '경상권' },
];

type SelectDemoProps = {
  multiple?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  grouped?: boolean;
  placeholder?: string;
};

export default function SelectDemo({
  multiple = false,
  disabled = false,
  hasError = false,
  grouped = false,
  placeholder = '지역 선택',
}: SelectDemoProps) {
  const [value, setValue] = useState<string[]>([]);

  const items = grouped ? GROUPED_REGIONS : REGIONS;
  const groups = [...new Set(GROUPED_REGIONS.map((item) => item.group))];

  return (
    <Frame>
      <Select
        items={items}
        name="region"
        value={value}
        multiple={multiple}
        disabled={disabled}
        hasError={hasError}
        onChangeValue={({ value }) => setValue(value)}
      >
        <SelectControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </SelectControl>
        <SelectContent>
          {grouped
            ? groups.map((group) => (
              <SelectGroup key={group}>
                <SelectGroupLabel>{group}</SelectGroupLabel>
                {GROUPED_REGIONS.filter((item) => item.group === group).map((item) => (
                  <SelectItem
                    key={item.value}
                    item={item}
                  >
                    <SelectItemText>{item.label}</SelectItemText>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))
            : REGIONS.map((item) => (
              <SelectItem
                key={item.value}
                item={item}
              >
                <SelectItemText>{item.label}</SelectItemText>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </Frame>
  );
}
