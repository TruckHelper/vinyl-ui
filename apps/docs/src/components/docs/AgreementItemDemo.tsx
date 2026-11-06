'use client';

import { useState } from 'react';

import { AgreementItem } from '@bigmobility/vinyl-ui/checkbox';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12',
    width: '100%',
    maxWidth: '36rem',
  },
});

const Message = styled('p', {
  base: {
    textStyle: 'body.small-light',
    color: 'text.soft',
  },
});

const TERMS = [
  { name: 'service', label: '서비스 이용약관 동의' },
  { name: 'privacy', label: '개인정보 수집 및 이용 동의' },
  { name: 'marketing', label: '마케팅 정보 수신 동의' },
];

export default function AgreementItemDemo() {
  const [agreed, setAgreed] = useState<Record<string, boolean>>({
    service: false,
    privacy: false,
    marketing: false,
  });
  const [opened, setOpened] = useState('');

  const allChecked = TERMS.every((term) => agreed[term.name] ?? false);

  const handleChangeAll = ({ value }: { name: string; value: boolean }) => {
    setAgreed(Object.fromEntries(TERMS.map((term) => [term.name, value])));
  };

  const handleChange = ({ name, value }: { name: string; value: boolean }) => {
    setAgreed((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Frame>
      <AgreementItem
        variant="all"
        name="all"
        checked={allChecked}
        onChangeChecked={handleChangeAll}
      >
        전체 동의
      </AgreementItem>
      {TERMS.map((term) => (
        <AgreementItem
          key={term.name}
          name={term.name}
          checked={agreed[term.name] ?? false}
          onChangeChecked={handleChange}
          onDetailClick={() => setOpened(term.label)}
        >
          {term.label}
        </AgreementItem>
      ))}
      {opened ? <Message>{`상세 보기: ${opened}`}</Message> : null}
    </Frame>
  );
}
