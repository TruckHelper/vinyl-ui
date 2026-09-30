export const DEFAULT_GROUP_SIZE = 10;

export function firstPageNumberInGroup({ page, groupSize }: {
  page: number;
  groupSize: number;
}) {
  const size = Math.max(1, Math.floor(groupSize));
  const currentPage = Math.max(1, Math.floor(page));

  return Math.floor((currentPage - 1) / size) * size + 1;
}

export function pageNumbersInGroup({ page, totalPages, groupSize }: {
  page: number;
  totalPages: number;
  groupSize: number;
}) {
  if (totalPages <= 0) {
    return [];
  }

  const size = Math.max(1, Math.floor(groupSize));
  const currentPage = Math.min(Math.max(Math.floor(page), 1), totalPages);
  const start = firstPageNumberInGroup({ page: currentPage, groupSize: size });
  const length = Math.min(size, totalPages - start + 1);

  return Array.from({ length }, (_, index) => start + index);
}
