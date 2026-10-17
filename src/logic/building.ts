// Placing and replacing private buildings (Rulebook p. 14).

export const POUNDS_PER_CRAFTSMAN = 2;

export function buildCost(craftsmen: number): number {
  return craftsmen * POUNDS_PER_CRAFTSMAN;
}

export function replaceRequirement(
  fromCraftsmen: number,
  toCraftsmen: number,
): { craftsmen: number; pounds: number } | null {
  if (toCraftsmen <= fromCraftsmen) {
    return null;
  }
  const craftsmen = toCraftsmen - fromCraftsmen;
  return { craftsmen, pounds: buildCost(craftsmen) };
}
