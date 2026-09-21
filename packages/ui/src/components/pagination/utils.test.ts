import { getGroupStartPage, getPageGroup } from './utils';

const context = describe;

describe('getGroupStartPage', () => {
  it('returns the first page of the group the page belongs to', () => {
    expect(getGroupStartPage({ page: 1, groupSize: 10 })).toBe(1);
    expect(getGroupStartPage({ page: 10, groupSize: 10 })).toBe(1);
    expect(getGroupStartPage({ page: 11, groupSize: 10 })).toBe(11);
    expect(getGroupStartPage({ page: 12, groupSize: 10 })).toBe(11);
    expect(getGroupStartPage({ page: 100, groupSize: 10 })).toBe(91);
  });

  context('with a group size of 5', () => {
    it('splits into groups of five', () => {
      expect(getGroupStartPage({ page: 7, groupSize: 5 })).toBe(6);
      expect(getGroupStartPage({ page: 100, groupSize: 5 })).toBe(96);
    });
  });

  context('when the page is below one', () => {
    it('falls back to the first group', () => {
      expect(getGroupStartPage({ page: 0, groupSize: 10 })).toBe(1);
      expect(getGroupStartPage({ page: -5, groupSize: 10 })).toBe(1);
    });
  });

  context('when the group size is below one', () => {
    it('returns the page itself', () => {
      expect(getGroupStartPage({ page: 7, groupSize: 0 })).toBe(7);
    });
  });
});

describe('getPageGroup', () => {
  it('returns the page numbers of the group the current page belongs to', () => {
    expect(getPageGroup({ page: 1, totalPages: 25, groupSize: 10 }))
      .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    expect(getPageGroup({ page: 10, totalPages: 25, groupSize: 10 }))
      .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    expect(getPageGroup({ page: 11, totalPages: 25, groupSize: 10 }))
      .toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  context('when the page moves within the same group', () => {
    it('returns the same page numbers', () => {
      const group = getPageGroup({ page: 12, totalPages: 25, groupSize: 10 });

      expect(getPageGroup({ page: 17, totalPages: 25, groupSize: 10 })).toEqual(group);
    });
  });

  context('when the last group is shorter than the group size', () => {
    it('returns only the pages up to the total page count', () => {
      expect(getPageGroup({ page: 25, totalPages: 25, groupSize: 10 }))
        .toEqual([21, 22, 23, 24, 25]);
    });
  });

  context('when the total page count is smaller than the group size', () => {
    it('returns every page', () => {
      expect(getPageGroup({ page: 3, totalPages: 5, groupSize: 10 }))
        .toEqual([1, 2, 3, 4, 5]);
    });
  });

  context('with a group size of 5', () => {
    it('splits into groups of five', () => {
      expect(getPageGroup({ page: 7, totalPages: 25, groupSize: 5 }))
        .toEqual([6, 7, 8, 9, 10]);
    });
  });

  context('when there is no page', () => {
    it('returns an empty array', () => {
      expect(getPageGroup({ page: 1, totalPages: 0, groupSize: 10 })).toEqual([]);
      expect(getPageGroup({ page: 1, totalPages: -1, groupSize: 10 })).toEqual([]);
    });
  });

  context('when the current page is out of range', () => {
    it('clamps the page into range', () => {
      expect(getPageGroup({ page: 0, totalPages: 25, groupSize: 10 }))
        .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

      expect(getPageGroup({ page: 99, totalPages: 25, groupSize: 10 }))
        .toEqual([21, 22, 23, 24, 25]);
    });
  });

  context('when the group size is below one', () => {
    it('falls back to a single page', () => {
      expect(getPageGroup({ page: 3, totalPages: 25, groupSize: 0 })).toEqual([3]);
    });
  });
});
