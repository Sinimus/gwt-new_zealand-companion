import type { ScoreSheet } from '../../types';

export function calculateTotal(sheet: ScoreSheet): number {
  const coinsVp = Math.floor(sheet.coins / 5);

  return (
    coinsVp +
    sheet.buildings +
    sheet.citiesPorts +
    sheet.unlockedDiscs +
    sheet.hazards +
    sheet.sheepCards +
    sheet.objectiveCards +
    sheet.birdCards +
    sheet.bonusTiles +
    sheet.harbourmasterTiles
  );
}

export type PlayerScore = {
  player: number;
  total: number;
};

export function buildLeaderboard(
  sheets: Record<number, ScoreSheet>,
  playerCount: number,
): PlayerScore[] {
  return Array.from({ length: playerCount }, (_, index) => index + 1)
    .map((player) => ({
      player,
      total: calculateTotal(sheets[player]),
    }))
    .sort((a, b) => b.total - a.total);
}
