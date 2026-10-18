// Filters the rule data by player count (the When conditions over src/data/rules).
import type {
  PlayerCount,
  RuleItem,
  RuleSection,
  RuleSource,
  When,
} from '../data/rules/types';

export function formatSource(source: RuleSource): string {
  const pages = `p. ${source.pages}`;
  if (source.book === 'appendix') {
    return `Appendix ${pages}`;
  }
  if (source.book === 'solo') {
    return `Solo ${pages}`;
  }
  return pages;
}

export function appliesTo(when: When | undefined, count: PlayerCount): boolean {
  const counts = when?.playerCounts;
  return counts === undefined || counts.includes(count);
}

export function itemsFor(
  items: readonly RuleItem[],
  count: PlayerCount,
): RuleItem[] {
  return items.filter((item) => appliesTo(item.when, count));
}

export function sectionsFor<T extends RuleSection>(
  sections: readonly T[],
  count: PlayerCount,
): T[] {
  return sections
    .filter((section) => appliesTo(section.when, count))
    .map((section) => ({ ...section, items: itemsFor(section.items, count) }))
    .filter((section) => section.items.length > 0);
}
