import reducer, { advance, reset, setIndex, setVote, ProgressState } from './progressSlice';

describe('progressSlice', () => {
  const initial: ProgressState = { currentIndex: 0, votes: {}, lastImageIdByBreed: {} };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toBeDefined();
  });

  it('advance increases index', () => {
    const next = reducer(initial, advance());
    expect(next.currentIndex).toBe(1);
  });

  it('setIndex sets index', () => {
    const next = reducer(initial, setIndex(5));
    expect(next.currentIndex).toBe(5);
  });

  it('setVote records vote', () => {
    const next = reducer(initial, setVote({ breedId: 10, pref: 'like', imageId: 'img' }));
    expect(next.votes[10]).toBe('like');
    expect(next.lastImageIdByBreed[10]).toBe('img');
  });

  it('reset clears state', () => {
    const populated: ProgressState = { currentIndex: 2, votes: { 1: 'dislike' }, lastImageIdByBreed: { 1: 'a' } };
    const next = reducer(populated, reset());
    expect(next.currentIndex).toBe(0);
    expect(Object.keys(next.votes).length).toBe(0);
  });
});
