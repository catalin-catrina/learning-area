import { range } from './utils';

describe('utils', () => {
  it('some name of the test', () => {
    expect(1).toEqual(1);
  });

  it('range returns correct number', () => {
    expect(range(1, 3)).toEqual([1, 2]);
    expect(range(2, 9)).toEqual([2, 3, 4, 5, 6, 7, 8]);
  });
});
