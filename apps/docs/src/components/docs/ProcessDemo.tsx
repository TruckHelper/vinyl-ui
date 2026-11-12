'use client';

import { useState } from 'react';

import { Button } from '@bigmobility/vinyl-ui/button';
import { Process, ProcessItem } from '@bigmobility/vinyl-ui/process';

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

export default function ProcessDemo() {
  const [current, setCurrent] = useState(1);

  const handlePrev = () => {
    setCurrent((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrent((prev) => Math.min(prev + 1, STEPS.length));
  };

  return (
    <Container>
      <Process
        current={current}
        aria-label="신청 단계"
      >
        {STEPS.map((step) => (
          <ProcessItem key={step}>{step}</ProcessItem>
        ))}
      </Process>
      <Actions>
        <Button
          variant="outline"
          disabled={current === 1}
          onClick={handlePrev}
        >
          이전
        </Button>
        <Button
          disabled={current === STEPS.length}
          onClick={handleNext}
        >
          다음
        </Button>
      </Actions>
    </Container>
  );
}
