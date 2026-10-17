import { describe, expect, it } from 'vitest';
import { setupNumbers, startingResources } from './setup';
import { itemsFor } from './rules';
import { SETUP_SECTIONS } from '../data/rules/setup';

describe('setupNumbers (Rulebook p. 4-5, Solo p. 1)', () => {
  it('follows the player count', () => {
    expect(setupNumbers(2)).toEqual({ sheepMarket: 9, jobMarketTiles: 12, bonusTiles: 3, bonusCardsPerSet: 3, stepTiles: 2 });
    expect(setupNumbers(3)).toEqual({ sheepMarket: 11, jobMarketTiles: 13, bonusTiles: 5, bonusCardsPerSet: 5, stepTiles: 3 });
    expect(setupNumbers(4)).toEqual({ sheepMarket: 14, jobMarketTiles: 14, bonusTiles: 7, bonusCardsPerSet: 6, stepTiles: 4 });
  });

  it('sets up the solo game for 2 players with a single step tile', () => {
    expect(setupNumbers(1)).toEqual({ ...setupNumbers(2), stepTiles: 1 });
  });

  it('matches the numbers in the setup texts', () => {
    for (const count of [1, 2, 3, 4] as const) {
      const n = setupNumbers(count);
      const text = SETUP_SECTIONS.flatMap((section) => itemsFor(section.items, count))
        .map((item) => item.text)
        .join(' ');
      expect(text).toContain(`draw ${n.sheepMarket} cards`);
      expect(text).toContain(`${n.jobMarketTiles} tiles from bag A`);
      expect(text).toContain(`makes ${n.bonusTiles} tiles`);
      expect(text).toContain(`${n.bonusCardsPerSet} cards per set`);
    }
  });
});

describe('startingResources (Rulebook p. 5, Solo p. 1)', () => {
  it('gives 7/8/9/10 pounds, 4/5/6/7 cards and 1 exchange token by seat', () => {
    expect(startingResources(4)).toEqual([
      { seat: 1, pounds: 7, cards: 4, exchangeTokens: 1 },
      { seat: 2, pounds: 8, cards: 5, exchangeTokens: 1 },
      { seat: 3, pounds: 9, cards: 6, exchangeTokens: 1 },
      { seat: 4, pounds: 10, cards: 7, exchangeTokens: 1 },
    ]);
    expect(startingResources(2)).toHaveLength(2);
  });

  it('gives Sarah nothing in the solo game', () => {
    expect(startingResources(1)).toEqual([{ seat: 1, pounds: 7, cards: 4, exchangeTokens: 1 }]);
  });
});
