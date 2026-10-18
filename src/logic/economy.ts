// Income and shearing totals (Rulebook p. 9 and p. 16).
import { LOCAL_WOOL_POSTS, SHEEP, type SheepId } from '../data/rules/sheep';

// Each sheep type counts once, no matter how many cards of it the player holds.
function distinctIds(sheep: readonly SheepId[]): SheepId[] {
  return [...new Set(sheep)];
}

function breedingValue(id: SheepId): number {
  return SHEEP.find((entry) => entry.id === id)?.breedingValue ?? 0;
}

function woolValue(id: SheepId): number {
  return SHEEP.find((entry) => entry.id === id)?.woolValue ?? 0;
}

export function incomeTotal(
  sheep: readonly SheepId[],
  certificates: number,
): number {
  const breeding = distinctIds(sheep).reduce(
    (sum, id) => sum + breedingValue(id),
    0,
  );
  return breeding + certificates;
}

export function shearTotal(
  sheep: readonly SheepId[],
  shearers: number,
  permanentWool: number,
): number {
  const wool = distinctIds(sheep)
    .map(woolValue)
    .sort((a, b) => b - a)
    .slice(0, Math.max(0, shearers));
  return wool.reduce((sum, value) => sum + value, 0) + permanentWool;
}

export function reachableWoolPosts(total: number): number[] {
  return LOCAL_WOOL_POSTS.filter((post) => post <= total);
}
