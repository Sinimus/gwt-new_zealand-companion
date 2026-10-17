// Rule texts are paraphrases with a page reference, never quotes (ruling r160).
// rules = Rulebook (20 pages), appendix = Rules Appendix (4 pages), solo = Sarah solo rules (4 pages).
export type RuleBook = 'rules' | 'appendix' | 'solo';

export interface RuleSource {
  book: RuleBook;
  // A page ("9"), a range ("4-5") or a list ("15, 16").
  pages: string;
}

// 1 = solo game against Sarah, who counts as the second player (Solo p. 1-2).
export type PlayerCount = 1 | 2 | 3 | 4;

export const PLAYER_COUNTS: readonly PlayerCount[] = [1, 2, 3, 4];

// When an item applies. An absent field does not restrict.
export interface When {
  playerCounts?: readonly PlayerCount[];
}

export interface RuleItem {
  id: string;
  text: string;
  source: RuleSource;
  when?: When;
}

export interface RuleSection {
  id: string;
  title: string;
  items: readonly RuleItem[];
  when?: When;
}

export const BOOK_PAGES: Readonly<Record<RuleBook, number>> = {
  rules: 20,
  appendix: 4,
  solo: 4,
};
