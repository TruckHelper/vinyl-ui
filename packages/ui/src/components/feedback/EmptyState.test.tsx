import { render, screen } from '@testing-library/react';

import { EmptyState } from './EmptyState';
import { EmptyStateDescription } from './EmptyStateDescription';
import { EmptyStateImage } from './EmptyStateImage';
import { EmptyStateTitle } from './EmptyStateTitle';

describe('EmptyState', () => {
  it('renders image, text and description', () => {
    render((
      <EmptyState>
        <EmptyStateImage data-testid="image" />
        <EmptyStateTitle>검색 결과가 없어요</EmptyStateTitle>
        <EmptyStateDescription>다른 키워드로 검색해 보세요</EmptyStateDescription>
      </EmptyState>
    ));

    expect(screen.getByText('검색 결과가 없어요')).toBeInTheDocument();
    expect(screen.getByText('다른 키워드로 검색해 보세요')).toBeInTheDocument();
    expect(screen.getByTestId('image')).toHaveAttribute('aria-hidden', 'true');
  });
});
