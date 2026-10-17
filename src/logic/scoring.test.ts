import { describe, expect, it } from 'vitest';
import { SARAH_EXCLUDED, categoryPoints, emptySheet, ranking, totalScore } from './scoring';
import { SCORE_CATEGORIES } from '../data/rules/scoring';

const byId = (id: string) => {
  const category = SCORE_CATEGORIES.find((entry) => entry.id === id);
  if (!category) throw new Error(id);
  return category;
};

describe('categories (Rulebook p. 19)', () => {
  it('has the 12 categories of the scoring pad', () => {
    expect(SCORE_CATEGORIES).toHaveLength(12);
    expect(SCORE_CATEGORIES.map((category) => category.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('turns 5 pounds into 1 VP', () => {
    expect(categoryPoints(byId('pounds'), 12)).toBe(2);
    expect(categoryPoints(byId('pounds'), 23)).toBe(4);
    expect(categoryPoints(byId('pounds'), 4)).toBe(0);
  });

  it('gives 5 VP for the market token and 3 VP for the hand limit space', () => {
    expect(categoryPoints(byId('marketToken'), 1)).toBe(5);
    expect(categoryPoints(byId('marketToken'), 0)).toBe(0);
    expect(categoryPoints(byId('handLimit'), 1)).toBe(3);
  });

  it('allows negative trading posts and objectives only', () => {
    expect(categoryPoints(byId('tradingPosts'), -8)).toBe(-8);
    expect(categoryPoints(byId('objectives'), -3)).toBe(-3);
    expect(categoryPoints(byId('buildings'), -3)).toBe(0);
  });

  it('caps the pathfinder track at 15', () => {
    expect(categoryPoints(byId('pathfinder'), 18)).toBe(15);
  });
});

describe('totalScore', () => {
  it('sums all categories, pathfinder and market token included', () => {
    const sheet = { ...emptySheet(), pounds: 12, buildings: 5, pathfinder: 10, marketToken: 1, objectives: -3 };
    expect(totalScore(sheet)).toBe(2 + 5 + 10 + 5 - 3);
  });

  it('leaves out categories 1, 9 and 10 for Sarah (Solo p. 2)', () => {
    expect(SARAH_EXCLUDED).toEqual(['pounds', 'harbourmasters', 'handLimit']);
    const sheet = { ...emptySheet(), pounds: 20, harbourmasters: 4, handLimit: 1, buildings: 6 };
    expect(totalScore(sheet, SARAH_EXCLUDED)).toBe(6);
  });
});

describe('ranking', () => {
  it('ranks by total VP, highest first', () => {
    const result = ranking([
      { player: 1, sheet: { ...emptySheet(), buildings: 10 } },
      { player: 2, sheet: { ...emptySheet(), buildings: 15 } },
      { player: 3, sheet: { ...emptySheet(), buildings: 5 } },
    ]);
    expect(result.map((entry) => entry.player)).toEqual([2, 1, 3]);
    expect(result.map((entry) => entry.rank)).toEqual([1, 2, 3]);
  });

  it('shares the victory on a tie; money does not break it', () => {
    const result = ranking([
      { player: 1, sheet: { ...emptySheet(), buildings: 50 } },
      { player: 2, sheet: { ...emptySheet(), buildings: 49, pounds: 7 } },
      { player: 3, sheet: { ...emptySheet(), buildings: 40 } },
    ]);
    expect(result.filter((entry) => entry.rank === 1).map((entry) => entry.player)).toEqual([1, 2]);
    expect(result.every((entry) => entry.rank !== 1 || entry.sharedWin)).toBe(true);
    expect(result.find((entry) => entry.player === 3)).toMatchObject({ rank: 3, sharedWin: false });
  });

  it('uses the excluded categories per player', () => {
    const result = ranking([
      { player: 1, sheet: { ...emptySheet(), buildings: 3 } },
      { player: 2, sheet: { ...emptySheet(), buildings: 2, pounds: 10 }, excluded: SARAH_EXCLUDED },
    ]);
    expect(result[0]).toMatchObject({ player: 1, total: 3, rank: 1, sharedWin: false });
  });
});
