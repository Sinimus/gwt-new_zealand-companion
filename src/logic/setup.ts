// Setup numbers and starting resources (Rulebook p. 4-5, Solo p. 1).
import type { PlayerCount } from '../data/rules/types';

export interface SetupNumbers {
  sheepMarket: number;
  jobMarketTiles: number;
  bonusTiles: number;
  bonusCardsPerSet: number;
  stepTiles: number;
}

export function setupNumbers(count: PlayerCount): SetupNumbers {
  switch (count) {
    case 1:
      // Solo: set up for 2 players with a single step tile (Solo p. 1).
      return { ...setupNumbers(2), stepTiles: 1 };
    case 2:
      return {
        sheepMarket: 9,
        jobMarketTiles: 12,
        bonusTiles: 3,
        bonusCardsPerSet: 3,
        stepTiles: 2,
      };
    case 3:
      return {
        sheepMarket: 11,
        jobMarketTiles: 13,
        bonusTiles: 5,
        bonusCardsPerSet: 5,
        stepTiles: 3,
      };
    case 4:
      return {
        sheepMarket: 14,
        jobMarketTiles: 14,
        bonusTiles: 7,
        bonusCardsPerSet: 6,
        stepTiles: 4,
      };
  }
}

export interface StartingResource {
  seat: number;
  pounds: number;
  cards: number;
  exchangeTokens: number;
}

export function startingResources(count: PlayerCount): StartingResource[] {
  // Seat 1..4: pounds 7/8/9/10, cards 4/5/6/7, one exchange token each.
  return [1, 2, 3, 4].slice(0, count).map((seat) => ({
    seat,
    pounds: seat + 6,
    cards: seat + 3,
    exchangeTokens: 1,
  }));
}
