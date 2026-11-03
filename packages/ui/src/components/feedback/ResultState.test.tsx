import { render, screen } from '@testing-library/react';

import { ResultState } from './ResultState';
import { ResultStateDescription } from './ResultStateDescription';
import { ResultStateImage } from './ResultStateImage';
import { ResultStateTitle } from './ResultStateTitle';

describe('ResultState', () => {
  it('renders image, title and description', () => {
    render((
      <ResultState>
        <ResultStateImage data-testid="image" />
        <ResultStateTitle>결제가 완료됐어요</ResultStateTitle>
        <ResultStateDescription>주문 내역에서 확인할 수 있어요</ResultStateDescription>
      </ResultState>
    ));

    expect(screen.getByText('결제가 완료됐어요')).toBeInTheDocument();
    expect(screen.getByText('주문 내역에서 확인할 수 있어요')).toBeInTheDocument();
    expect(screen.getByTestId('image')).toHaveAttribute('aria-hidden', 'true');
  });
});
