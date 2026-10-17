import { describe, expect, it } from 'vitest';
import { incomeTotal, reachableWoolPosts, shearTotal } from './economy';
import { buildCost, replaceRequirement } from './building';
import { purchasesFor } from './sheepBuying';
import { objectiveScore } from './objectives';

describe('incomeTotal (Rulebook p. 9)', () => {
  it('counts each type once: 2 + 3 + 3 = 8', () => {
    expect(incomeTotal(['english-leicester', 'english-leicester', 'dorset-horn', 'corriedale'], 0)).toBe(8);
  });

  it('adds certificates: 8 + 2 = 10', () => {
    expect(incomeTotal(['english-leicester', 'dorset-horn', 'corriedale'], 2)).toBe(10);
  });

  it('adds a permanent certificate: 9', () => {
    expect(incomeTotal(['english-leicester', 'dorset-horn', 'corriedale'], 1)).toBe(9);
  });

  it('is 0 for an empty hand', () => {
    expect(incomeTotal([], 0)).toBe(0);
  });
});

describe('shearTotal (Rulebook p. 16)', () => {
  it('Merino 3 + Lincoln 4 + Shropshire 1 + 1 permanent wool = 9 with 3 shearers', () => {
    expect(shearTotal(['merino', 'lincoln', 'shropshire'], 3, 1)).toBe(9);
  });

  it('counts at most one type per shearer, the best wool values first', () => {
    expect(shearTotal(['merino', 'lincoln', 'shropshire'], 2, 1)).toBe(8);
  });

  it('counts each type once', () => {
    expect(shearTotal(['shropshire', 'shropshire', 'merino'], 3, 0)).toBe(4);
  });

  it('lists the local wool trading posts reached', () => {
    expect(reachableWoolPosts(9)).toEqual([5, 9]);
    expect(reachableWoolPosts(4)).toEqual([]);
    expect(reachableWoolPosts(13)).toEqual([5, 9, 13]);
  });
});

describe('objectiveScore (Rulebook p. 17)', () => {
  const card = { victoryPoints: 3, penalty: 3 };

  it('three fulfilled cards give 9 VP', () => {
    expect(objectiveScore([1, 2, 3].map(() => ({ ...card, fulfilled: true })))).toBe(9);
  });

  it('one unfulfilled card makes it 3 VP', () => {
    expect(
      objectiveScore([
        { ...card, fulfilled: true },
        { ...card, fulfilled: true },
        { ...card, fulfilled: false },
      ]),
    ).toBe(3);
  });

  it('can be negative', () => {
    expect(objectiveScore([{ victoryPoints: 4, penalty: 2, fulfilled: false }])).toBe(-2);
  });
});

describe('building (Rulebook p. 14)', () => {
  it('costs 2 pounds per craftsman: a 2 tile costs 4 pounds', () => {
    expect(buildCost(2)).toBe(4);
  });

  it('replacing 1 with 4 needs 3 craftsmen and 6 pounds', () => {
    expect(replaceRequirement(1, 4)).toEqual({ craftsmen: 3, pounds: 6 });
  });

  it('cannot replace with a tile that is not higher', () => {
    expect(replaceRequirement(4, 4)).toBeNull();
    expect(replaceRequirement(5, 2)).toBeNull();
  });
});

describe('purchasesFor (Rulebook p. 14)', () => {
  it('one shepherd: Dorset Horn 3, Corriedale or Lincoln 5, Hampshire or Ryeland 9', () => {
    expect(purchasesFor(1).map((option) => option.pounds)).toEqual([3, 5, 9]);
  });

  it('two shepherds add Dorset Horn 1, Corriedale or Lincoln 2, Suffolk with token 10', () => {
    const options = purchasesFor(2);
    expect(options).toHaveLength(6);
    expect(options.filter((option) => option.shepherds === 2).map((option) => option.pounds)).toEqual([1, 2, 10]);
  });

  it('three shepherds: 2 sheep of 2 VP for 3 pounds; four: Suffolk with token for 4', () => {
    expect(purchasesFor(3)).toHaveLength(7);
    expect(purchasesFor(4)[7]).toMatchObject({ shepherds: 4, pounds: 4 });
    expect(purchasesFor(6)).toHaveLength(8);
    expect(purchasesFor(0)).toHaveLength(0);
  });
});
