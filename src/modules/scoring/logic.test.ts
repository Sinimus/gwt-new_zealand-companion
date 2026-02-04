import { describe, expect, it } from 'vitest';
import { calculateTotal, buildLeaderboard } from './logic';
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
  remainingMoney: 0,
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

describe('buildLeaderboard', () => {
  it('ranks players by total VP descending', () => {
    const sheets: Record<number, ScoreSheet> = {
      1: { ...baseSheet, buildings: 10 },
      2: { ...baseSheet, buildings: 15 },
      3: { ...baseSheet, buildings: 5 },
    };
    const leaderboard = buildLeaderboard(sheets, 3);

    expect(leaderboard[0].player).toBe(2);
    expect(leaderboard[0].total).toBe(15);
    expect(leaderboard[1].player).toBe(1);
    expect(leaderboard[1].total).toBe(10);
    expect(leaderboard[2].player).toBe(3);
    expect(leaderboard[2].total).toBe(5);
  });

  it('breaks ties by remaining money descending', () => {
    // Two players with 100 VP, but different money
    const sheets: Record<number, ScoreSheet> = {
      1: {
        ...baseSheet,
        buildings: 50,
        sheepCards: 50,
        remainingMoney: 5,
      },
      2: {
        ...baseSheet,
        buildings: 50,
        sheepCards: 50,
        remainingMoney: 2,
      },
    };
    const leaderboard = buildLeaderboard(sheets, 2);

    // Both have 100 VP
    expect(leaderboard[0].total).toBe(100);
    expect(leaderboard[1].total).toBe(100);
    
    // Player 1 wins due to more money (5 vs 2)
    expect(leaderboard[0].player).toBe(1);
    expect(leaderboard[0].remainingMoney).toBe(5);
    expect(leaderboard[1].player).toBe(2);
    expect(leaderboard[1].remainingMoney).toBe(2);
  });

  it('includes remainingMoney in PlayerScore entries', () => {
    const sheets: Record<number, ScoreSheet> = {
      1: { ...baseSheet, buildings: 10, remainingMoney: 7 },
      2: { ...baseSheet, buildings: 15, remainingMoney: 3 },
    };
    const leaderboard = buildLeaderboard(sheets, 2);

    expect(leaderboard[0].remainingMoney).toBe(3);
    expect(leaderboard[1].remainingMoney).toBe(7);
  });
});
