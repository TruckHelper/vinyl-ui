export const DEFAULT_GROUP_SIZE = 10;

export function getGroupStartPage({ page, groupSize }: {
  page: number;
  groupSize: number;
}) {
  const size = Math.max(1, Math.floor(groupSize));
  const currentPage = Math.max(1, Math.floor(page));

  return Math.floor((currentPage - 1) / size) * size + 1;
}

export function getPageGroup({ page, totalPages, groupSize }: {
  page: number;
  totalPages: number;
  groupSize: number;
}) {
  if (totalPages <= 0) {
    return [];
  }

  const size = Math.max(1, Math.floor(groupSize));
  const currentPage = Math.min(Math.max(Math.floor(page), 1), totalPages);
  const start = getGroupStartPage({ page: currentPage, groupSize: size });
  const length = Math.min(size, totalPages - start + 1);

  return Array.from({ length }, (_, index) => start + index);
}
