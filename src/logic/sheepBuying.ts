// Buying sheep with shepherds (Rulebook p. 14).
import { SHEEP_PURCHASES, type SheepPurchase } from '../data/rules/sheep';

export function purchasesFor(shepherds: number): SheepPurchase[] {
  return SHEEP_PURCHASES.filter((purchase) => purchase.shepherds <= shepherds);
}
