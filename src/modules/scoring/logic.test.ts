import { describe, expect, it } from 'vitest';
import { calculateTotal } from './logic';
import type { ScoreSheet } from '../../types';

const baseSheet: ScoreSheet = {
  coins: 0,
  buildings: 0,
  citiesPorts: 0,
  unlockedDiscs: 0,
  hazards: 0,
  sheepCards: 0,
  objectiveCards: 0,
  birdCards: 0,
  bonusTiles: 0,
  harbourmasterTiles: 0,
};

describe('calculateTotal', () => {
  it('treats 0 coins as 0 VP', () => {
    expect(calculateTotal({ ...baseSheet, coins: 0 })).toBe(0);
  });

  it('sums mixed VP inputs correctly', () => {
    const sheet: ScoreSheet = {
      ...baseSheet,
      coins: 12,
      buildings: 5,
      citiesPorts: 3,
      unlockedDiscs: 2,
      hazards: 1,
      sheepCards: 4,
      objectiveCards: 6,
      birdCards: 2,
      bonusTiles: 3,
      harbourmasterTiles: 1,
    };

    expect(calculateTotal(sheet)).toBe(29);
  });

  it('floors coin VP correctly for high counts', () => {
    expect(calculateTotal({ ...baseSheet, coins: 23 })).toBe(4);
  });
});
