import { getGroupStartPage, getPageGroup } from './utils';

const context = describe;

describe('getGroupStartPage', () => {
  it('returns first page number of current group', () => {
    expect(getGroupStartPage({ page: 1, groupSize: 10 })).toBe(1);
    expect(getGroupStartPage({ page: 10, groupSize: 10 })).toBe(1);
    expect(getGroupStartPage({ page: 11, groupSize: 10 })).toBe(11);
    expect(getGroupStartPage({ page: 12, groupSize: 10 })).toBe(11);
    expect(getGroupStartPage({ page: 100, groupSize: 10 })).toBe(91);
    expect(getGroupStartPage({ page: 7, groupSize: 5 })).toBe(6);
    expect(getGroupStartPage({ page: 100, groupSize: 5 })).toBe(96);
  });

  context('with page below one', () => {
    it('returns first page number of first page group', () => {
      expect(getGroupStartPage({ page: 0, groupSize: 10 })).toBe(1);
      expect(getGroupStartPage({ page: -5, groupSize: 10 })).toBe(1);
    });
  });

  context('with group size below one', () => {
    it('returns given page number', () => {
      expect(getGroupStartPage({ page: 7, groupSize: 0 })).toBe(7);
    });
  });
});

describe('getPageGroup', () => {
  it('returns page numbers of current group', () => {
    expect(getPageGroup({ page: 1, totalPages: 25, groupSize: 10 }))
      .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    expect(getPageGroup({ page: 10, totalPages: 25, groupSize: 10 }))
      .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    expect(getPageGroup({ page: 11, totalPages: 25, groupSize: 10 }))
      .toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

    expect(getPageGroup({ page: 7, totalPages: 25, groupSize: 5 }))
      .toEqual([6, 7, 8, 9, 10]);
  });

  context('when page moves within same group', () => {
    it('returns same page numbers', () => {
      const group = getPageGroup({ page: 12, totalPages: 25, groupSize: 10 });

      expect(getPageGroup({ page: 17, totalPages: 25, groupSize: 10 })).toEqual(group);
    });
  });

  context('with last group shorter than group size', () => {
    it('returns pages up to total page count', () => {
      expect(getPageGroup({ page: 25, totalPages: 25, groupSize: 10 }))
        .toEqual([21, 22, 23, 24, 25]);
    });
  });

  context('with total page count smaller than group size', () => {
    it('returns every page', () => {
      expect(getPageGroup({ page: 3, totalPages: 5, groupSize: 10 }))
        .toEqual([1, 2, 3, 4, 5]);
    });
  });

  context('without page', () => {
    it('returns empty array', () => {
      expect(getPageGroup({ page: 1, totalPages: 0, groupSize: 10 })).toEqual([]);
      expect(getPageGroup({ page: 1, totalPages: -1, groupSize: 10 })).toEqual([]);
    });
  });

  context('with page out of range', () => {
    it('clamps page into range', () => {
      expect(getPageGroup({ page: 0, totalPages: 25, groupSize: 10 }))
        .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

      expect(getPageGroup({ page: 99, totalPages: 25, groupSize: 10 }))
        .toEqual([21, 22, 23, 24, 25]);
    });
  });

  context('with group size below one', () => {
    it('returns only current page', () => {
      expect(getPageGroup({ page: 3, totalPages: 25, groupSize: 0 })).toEqual([3]);
    });
  });
});
