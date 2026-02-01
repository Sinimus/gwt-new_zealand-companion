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
