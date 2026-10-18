import { describe, expect, it } from 'vitest';
import { appliesTo, formatSource, itemsFor, sectionsFor } from './rules';
import { SETUP_SECTIONS } from '../data/rules/setup';
import { SOLO_SETUP } from '../data/rules/solo';

describe('formatSource', () => {
  it('formats a Rulebook page as p. N', () => {
    expect(formatSource({ book: 'rules', pages: '9' })).toBe('p. 9');
    expect(formatSource({ book: 'rules', pages: '4-5' })).toBe('p. 4-5');
  });

  it('names the Appendix and the solo rules', () => {
    expect(formatSource({ book: 'appendix', pages: '1' })).toBe('Appendix p. 1');
    expect(formatSource({ book: 'solo', pages: '2' })).toBe('Solo p. 2');
  });
});

describe('appliesTo', () => {
  it('applies when nothing restricts it', () => {
    expect(appliesTo(undefined, 3)).toBe(true);
    expect(appliesTo({}, 1)).toBe(true);
  });

  it('respects the player counts', () => {
    expect(appliesTo({ playerCounts: [1, 2] }, 2)).toBe(true);
    expect(appliesTo({ playerCounts: [1, 2] }, 4)).toBe(false);
  });
});

describe('itemsFor and sectionsFor', () => {
  it('keeps one sheep market item per player count', () => {
    for (const count of [1, 2, 3, 4] as const) {
      const board = SETUP_SECTIONS.find((section) => section.id === 'board');
      const items = itemsFor(board?.items ?? [], count).filter((item) =>
        item.id.startsWith('sheep-market'),
      );
      expect(items).toHaveLength(1);
    }
  });

  it('drops a section whose condition does not hold', () => {
    expect(sectionsFor([SOLO_SETUP], 2)).toHaveLength(0);
    expect(sectionsFor([SOLO_SETUP], 1)).toHaveLength(1);
  });

  it('drops a section left without items', () => {
    const section = {
      id: 'only-four',
      title: 'Only four',
      items: [{ id: 'x', text: 'x', source: { book: 'rules', pages: '1' } as const, when: { playerCounts: [4] as const } }],
    };
    expect(sectionsFor([section], 3)).toHaveLength(0);
    expect(sectionsFor([section], 4)[0].items).toHaveLength(1);
  });
});
