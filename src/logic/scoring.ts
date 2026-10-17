// End-of-game scoring and ranking (Rulebook p. 19, Solo p. 2).
import {
  POUNDS_PER_VP,
  SCORE_CATEGORIES,
  type ScoreCategory,
  type ScoreCategoryId,
} from '../data/rules/scoring';

export type ScoreSheet = Record<ScoreCategoryId, number>;

// For a 'flag' category the value is 1 (yes) or 0 (no).

export function emptySheet(): ScoreSheet {
  return {
    pounds: 0,
    buildings: 0,
    tradingPosts: 0,
    harbours: 0,
    pathfinder: 0,
    tiles: 0,
    cards: 0,
    objectives: 0,
    harbourmasters: 0,
    handLimit: 0,
    workers: 0,
    marketToken: 0,
  };
}

export const SARAH_EXCLUDED: readonly ScoreCategoryId[] = [
  'pounds',
  'harbourmasters',
  'handLimit',
];

export function categoryPoints(category: ScoreCategory, value: number): number {
  const { input } = category;
  if (input.kind === 'pounds') {
    return Math.floor(Math.max(0, value) / POUNDS_PER_VP);
  }
  if (input.kind === 'points') {
    const bounded = input.allowNegative ? value : Math.max(0, value);
    return Math.min(bounded, input.max ?? Infinity);
  }
  return value > 0 ? input.points : 0;
}

export function totalScore(
  sheet: ScoreSheet,
  excluded: readonly ScoreCategoryId[] = [],
): number {
  const scored = SCORE_CATEGORIES.filter(
    (category) => !excluded.includes(category.id),
  );
  return scored.reduce(
    (sum, category) => sum + categoryPoints(category, sheet[category.id]),
    0,
  );
}

export interface RankingEntry {
  player: number;
  total: number;
  rank: number;
  sharedWin: boolean;
}

export function ranking(
  players: readonly {
    player: number;
    sheet: ScoreSheet;
    excluded?: readonly ScoreCategoryId[];
  }[],
): RankingEntry[] {
  const totals = players.map((input) => ({
    player: input.player,
    total: totalScore(input.sheet, input.excluded),
  }));
  // Stable sort: equal totals keep the input order, and money never breaks a tie.
  const sorted = [...totals].sort((a, b) => b.total - a.total);
  return sorted.map((entry) => {
    const tied = sorted.filter((other) => other.total === entry.total);
    const rank =
      1 + sorted.filter((other) => other.total > entry.total).length;
    return {
      player: entry.player,
      total: entry.total,
      rank,
      sharedWin: rank === 1 && tied.length > 1,
    };
  });
}
