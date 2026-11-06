'use client';

import { useState } from 'react';

import { Button } from '@bigmobility/vinyl-ui/button';
import { ProcessIndicator, ProcessItem } from '@bigmobility/vinyl-ui/process';

import { styled } from 'styled-system/jsx';

const STEPS = ['정보 입력', '서류 확인', '결제', '완료'];

const Container = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16',
    width: '100%',
    maxWidth: '40rem',
  },
});

const Actions = styled('div', {
  base: {
    display: 'flex',
    gap: '8',
  },
});

export default function ProcessIndicatorDemo() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrent((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  return (
    <Container>
      <ProcessIndicator
        current={current}
        aria-label="신청 단계"
      >
        {STEPS.map((step, index) => (
          <ProcessItem
            key={step}
            index={index}
          >
            {step}
          </ProcessItem>
        ))}
      </ProcessIndicator>
      <Actions>
        <Button
          variant="outline"
          disabled={current === 0}
          onClick={handlePrev}
        >
          이전
        </Button>
        <Button
          disabled={current === STEPS.length - 1}
          onClick={handleNext}
        >
          다음
        </Button>
      </Actions>
    </Container>
  );
}
