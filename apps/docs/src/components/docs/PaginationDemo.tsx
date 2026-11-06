'use client';

import { useState } from 'react';

import { Pagination } from '@bigmobility/vinyl-ui/pagination';

type PaginationDemoProps = {
  disabled?: boolean;
  initialPage?: number;
};

export default function PaginationDemo({
  disabled = false,
  initialPage = 1,
}: PaginationDemoProps) {
  const [page, setPage] = useState(initialPage);

  const handleChangePage = ({ page: next }: { page: number }) => {
    setPage(next);
  };

  return (
    <Pagination
      count={250}
      pageSize={10}
      page={page}
      disabled={disabled}
      onChangePage={handleChangePage}
    />
  );
}
