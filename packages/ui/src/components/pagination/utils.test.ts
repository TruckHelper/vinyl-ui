import { firstPageNumberInGroup, pageNumbersInGroup } from './utils';

const context = describe;

describe('firstPageNumberInGroup', () => {
  it('returns first page number of current group', () => {
    expect(firstPageNumberInGroup({ page: 1, groupSize: 10 })).toBe(1);
    expect(firstPageNumberInGroup({ page: 10, groupSize: 10 })).toBe(1);
    expect(firstPageNumberInGroup({ page: 11, groupSize: 10 })).toBe(11);
    expect(firstPageNumberInGroup({ page: 12, groupSize: 10 })).toBe(11);
    expect(firstPageNumberInGroup({ page: 100, groupSize: 10 })).toBe(91);
    expect(firstPageNumberInGroup({ page: 7, groupSize: 5 })).toBe(6);
    expect(firstPageNumberInGroup({ page: 100, groupSize: 5 })).toBe(96);
  });

  context('with page below one', () => {
    it('always returns 1', () => {
      expect(firstPageNumberInGroup({ page: 0, groupSize: 10 })).toBe(1);
      expect(firstPageNumberInGroup({ page: -5, groupSize: 10 })).toBe(1);
    });
  });

  context('with group size below one', () => {
    it('returns current page number', () => {
      expect(firstPageNumberInGroup({ page: 7, groupSize: 0 })).toBe(7);
    });
  });
});

describe('pageNumbersInGroup', () => {
  it('returns page numbers of current group', () => {
    expect(pageNumbersInGroup({ page: 1, totalPages: 25, groupSize: 10 }))
      .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    expect(pageNumbersInGroup({ page: 10, totalPages: 25, groupSize: 10 }))
      .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    expect(pageNumbersInGroup({ page: 11, totalPages: 25, groupSize: 10 }))
      .toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

    expect(pageNumbersInGroup({ page: 7, totalPages: 25, groupSize: 5 }))
      .toEqual([6, 7, 8, 9, 10]);
  });

  context('when page moves within same group', () => {
    it('returns same page numbers', () => {
      const group = pageNumbersInGroup({ page: 12, totalPages: 25, groupSize: 10 });

      expect(pageNumbersInGroup({ page: 17, totalPages: 25, groupSize: 10 })).toEqual(group);
    });
  });

  context('with last group not full', () => {
    it('returns remaining pages', () => {
      expect(pageNumbersInGroup({ page: 25, totalPages: 25, groupSize: 10 }))
        .toEqual([21, 22, 23, 24, 25]);
    });
  });

  context('with total page count smaller than group size', () => {
    it('returns every page', () => {
      expect(pageNumbersInGroup({ page: 3, totalPages: 5, groupSize: 10 }))
        .toEqual([1, 2, 3, 4, 5]);
    });
  });

  context('without total pages', () => {
    it('returns empty array', () => {
      expect(pageNumbersInGroup({ page: 1, totalPages: 0, groupSize: 10 })).toEqual([]);
    });
  });

  context('with page out of range', () => {
    it('clamps page into range', () => {
      expect(pageNumbersInGroup({ page: 0, totalPages: 25, groupSize: 10 }))
        .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

      expect(pageNumbersInGroup({ page: 99, totalPages: 25, groupSize: 10 }))
        .toEqual([21, 22, 23, 24, 25]);
    });
  });

  context('with group size below one', () => {
    it('returns only current page', () => {
      expect(pageNumbersInGroup({ page: 3, totalPages: 25, groupSize: 0 })).toEqual([3]);
    });
  });
});
