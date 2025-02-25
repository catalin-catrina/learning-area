import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe: StrengthPipe;

  beforeEach(() => {
    pipe = new StrengthPipe();
  });

  it('should display weak if strength is 5', () => {
    expect(pipe.transform(5)).toEqual('5 (weak)');
  });
});
