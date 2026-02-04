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
  remainingMoney: number;
};

export function buildLeaderboard(
  sheets: Record<number, ScoreSheet>,
  playerCount: number,
): PlayerScore[] {
  return Array.from({ length: playerCount }, (_, index) => index + 1)
    .map((player) => ({
      player,
      total: calculateTotal(sheets[player]),
      remainingMoney: sheets[player].remainingMoney,
    }))
    .sort((a, b) => {
      // Primary sort: total VP (descending)
      if (b.total !== a.total) {
        return b.total - a.total;
      }
      // Secondary sort: remaining money (descending) - tie-breaker
      return b.remainingMoney - a.remainingMoney;
    });
}
