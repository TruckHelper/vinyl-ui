'use client';

import { useState } from 'react';

import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemText,
} from '@bigmobility/vinyl-ui/combobox';

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
  { label: '대전', value: 'daejeon' },
  { label: '인천 (준비 중)', value: 'incheon', disabled: true },
];

const GROUPED_REGIONS = [
  { label: '서울', value: 'seoul', group: '수도권' },
  { label: '인천', value: 'incheon', group: '수도권' },
  { label: '부산', value: 'busan', group: '경상권' },
  { label: '대구', value: 'daegu', group: '경상권' },
];

type ComboboxDemoProps = {
  multiple?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  grouped?: boolean;
  placeholder?: string;
};

export default function ComboboxDemo({
  multiple = false,
  disabled = false,
  hasError = false,
  grouped = false,
  placeholder = '지역 검색',
}: ComboboxDemoProps) {
  const [value, setValue] = useState<string[]>([]);

  const items = grouped ? GROUPED_REGIONS : REGIONS;
  const groups = [...new Set(GROUPED_REGIONS.map((item) => item.group))];

  return (
    <Frame>
      <Combobox
        items={items}
        name="region"
        value={value}
        multiple={multiple}
        disabled={disabled}
        hasError={hasError}
        onChangeValue={({ value }) => setValue(value)}
      >
        <ComboboxControl>
          <ComboboxInput placeholder={placeholder} />
        </ComboboxControl>
        <ComboboxContent>
          {grouped
            ? groups.map((group) => (
              <ComboboxGroup key={group}>
                <ComboboxGroupLabel>{group}</ComboboxGroupLabel>
                {GROUPED_REGIONS.filter((item) => item.group === group).map((item) => (
                  <ComboboxItem
                    key={item.value}
                    item={item}
                  >
                    <ComboboxItemText>{item.label}</ComboboxItemText>
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            ))
            : REGIONS.map((item) => (
              <ComboboxItem
                key={item.value}
                item={item}
              >
                <ComboboxItemText>{item.label}</ComboboxItemText>
              </ComboboxItem>
            ))}
        </ComboboxContent>
      </Combobox>
    </Frame>
  );
}
