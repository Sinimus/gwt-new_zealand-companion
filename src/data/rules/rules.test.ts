import { describe, expect, it } from 'vitest';
import { BOOK_PAGES, type RuleItem, type RuleSource } from './types';
import { SETUP_SECTIONS } from './setup';
import { SOLO_REFERENCE, SOLO_SETUP } from './solo';
import { CODEX_TOPICS } from './codex';
import { FORESIGHT_PLACEMENT, MARKET_ARROWS, SHEEP_MARKET_REFILL, TURN_PHASES, WELLINGTON_SUBPHASES } from './turn';
import { SEA_ROUTES } from './seaRoutes';
import { HARBOURMASTER_TASKS, SCORE_CATEGORIES, SCORING_RULES } from './scoring';
import { FLIPPING_LETTERS, NEUTRAL_BUILDINGS, NEUTRAL_RULES, PRIVATE_BUILDINGS } from './buildings';
import { SHEEP, SHEEP_PURCHASES, SHEEP_PURCHASE_SOURCE } from './sheep';

const sectionItems = [
  ...SETUP_SECTIONS,
  SOLO_SETUP,
  ...SOLO_REFERENCE,
  ...CODEX_TOPICS,
  ...TURN_PHASES,
  ...WELLINGTON_SUBPHASES,
  ...SEA_ROUTES,
].flatMap((section) => section.items);

const items: readonly RuleItem[] = [
  ...sectionItems,
  ...FORESIGHT_PLACEMENT,
  ...MARKET_ARROWS.map((arrow) => arrow.item),
  ...SHEEP_MARKET_REFILL,
  ...SCORING_RULES,
  ...HARBOURMASTER_TASKS,
  ...NEUTRAL_RULES,
];

const sources: readonly RuleSource[] = [
  ...items.map((item) => item.source),
  ...SCORE_CATEGORIES.map((category) => category.source),
  ...NEUTRAL_BUILDINGS.map((building) => building.source),
  ...PRIVATE_BUILDINGS.map((building) => building.source),
  ...SHEEP.map((sheep) => sheep.source),
  SHEEP_PURCHASE_SOURCE,
];

const pagesOf = (pages: string): number[] =>
  pages.split(', ').flatMap((part) => {
    const [from, to] = part.split('-').map(Number);
    return to === undefined ? [from] : [from, to];
  });

describe('rule data carries a page (ruling r160)', () => {
  it('every source names pages in the form "9", "4-5" or "15, 16"', () => {
    for (const source of sources) {
      expect(source.pages).toMatch(/^\d+(-\d+)?(, \d+(-\d+)?)*$/);
    }
  });

  it('every page exists in its book', () => {
    for (const source of sources) {
      for (const page of pagesOf(source.pages)) {
        expect(page).toBeGreaterThanOrEqual(1);
        expect(page).toBeLessThanOrEqual(BOOK_PAGES[source.book]);
      }
    }
  });

  it('every item has a text and the ids in a section are unique', () => {
    for (const section of [...SETUP_SECTIONS, SOLO_SETUP, ...SOLO_REFERENCE, ...CODEX_TOPICS, ...TURN_PHASES, ...WELLINGTON_SUBPHASES, ...SEA_ROUTES]) {
      const ids = section.items.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const item of section.items) {
        expect(item.text.length).toBeGreaterThan(10);
      }
    }
  });

  it('mentions nothing that is not in GWT New Zealand', () => {
    const text = [
      ...items.map((item) => item.text),
      ...NEUTRAL_BUILDINGS.flatMap((building) => [...building.front, ...(building.back ?? [])]),
      ...PRIVATE_BUILDINGS.flatMap((building) => building.actions),
    ].join(' ');
    for (const word of ['Drought', 'Kansas', 'Perendale', 'Coal', 'Bonus Action', 'Herder', 'Bird Cards']) {
      expect(text).not.toContain(word);
    }
  });
});

describe('buildings (Appendix p. 1-3)', () => {
  it('has neutral buildings A to H, of which B, C, G and H flip', () => {
    expect(NEUTRAL_BUILDINGS.map((building) => building.letter)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    expect(FLIPPING_LETTERS).toEqual(['B', 'C', 'G', 'H']);
  });

  it('has 10 private buildings on side a and 10 on side b', () => {
    for (const side of ['a', 'b'] as const) {
      const numbers = PRIVATE_BUILDINGS.filter((building) => building.side === side).map((building) => building.number);
      expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }
  });

  it('needs more craftsmen for higher numbers', () => {
    for (const side of ['a', 'b'] as const) {
      const craftsmen = PRIVATE_BUILDINGS.filter((building) => building.side === side).map((building) => building.craftsmen);
      expect([...craftsmen].sort((x, y) => x - y)).toEqual(craftsmen);
    }
  });
});

describe('sheep (ruling r172)', () => {
  it('has the 11 types with their card values', () => {
    expect(SHEEP).toHaveLength(11);
    const values = Object.fromEntries(SHEEP.map((sheep) => [sheep.id, [sheep.breedingValue, sheep.woolValue, sheep.victoryPoints]]));
    expect(values).toEqual({
      shropshire: [1, 1, 0],
      southdown: [2, 1, 0],
      'english-leicester': [2, 2, 0],
      merino: [2, 3, 0],
      'dorset-horn': [3, 3, 1],
      lincoln: [2, 4, 2],
      corriedale: [3, 2, 2],
      hampshire: [4, 2, 3],
      ryeland: [2, 5, 4],
      suffolk: [6, 3, 7],
      romney: [3, 2, 3],
    });
  });

  it('lists 8 purchase options for 1 to 4 shepherds', () => {
    expect(SHEEP_PURCHASES).toHaveLength(8);
  });
});
