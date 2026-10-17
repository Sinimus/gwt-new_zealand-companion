// Objective card scoring (Rulebook p. 17).

export interface ObjectiveCard {
  victoryPoints: number;
  penalty: number;
  fulfilled: boolean;
}

export function objectiveScore(cards: readonly ObjectiveCard[]): number {
  return cards.reduce(
    (sum, card) => sum + (card.fulfilled ? card.victoryPoints : -card.penalty),
    0,
  );
}
