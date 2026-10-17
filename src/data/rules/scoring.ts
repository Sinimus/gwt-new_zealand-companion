import type { RuleItem, RuleSource } from './types';

// The 12 categories of the scoring pad (Rulebook p. 19), in the pad's order.

export type ScoreCategoryId =
  | 'pounds'
  | 'buildings'
  | 'tradingPosts'
  | 'harbours'
  | 'pathfinder'
  | 'tiles'
  | 'cards'
  | 'objectives'
  | 'harbourmasters'
  | 'handLimit'
  | 'workers'
  | 'marketToken';

// pounds: the player enters pounds, 5 pounds = 1 VP. points: the player enters VP.
// flag: yes or no for a fixed number of VP.
export type ScoreInput =
  | { kind: 'pounds' }
  | { kind: 'points'; allowNegative: boolean; max?: number }
  | { kind: 'flag'; points: number };

export interface ScoreCategory {
  id: ScoreCategoryId;
  number: number;
  title: string;
  hint: string;
  input: ScoreInput;
  source: RuleSource;
}

const p19: RuleSource = { book: 'rules', pages: '19' };

export const SCORE_CATEGORIES: readonly ScoreCategory[] = [
  {
    id: 'pounds',
    number: 1,
    title: 'Pounds',
    hint: 'Enter your pounds: every 5 pounds is 1 VP.',
    input: { kind: 'pounds' },
    source: p19,
  },
  {
    id: 'buildings',
    number: 2,
    title: 'Private buildings',
    hint: 'VP printed on your private buildings on the board.',
    input: { kind: 'points', allowNegative: false },
    source: p19,
  },
  {
    id: 'tradingPosts',
    number: 3,
    title: 'Trading posts',
    hint: 'VP of your discs on local, foreign and wool trading posts; each disc on post 0 is -8 VP. Can be negative.',
    input: { kind: 'points', allowNegative: true },
    source: { book: 'rules', pages: '10, 19' },
  },
  {
    id: 'harbours',
    number: 4,
    title: 'Small and medium harbours',
    hint: 'VP of your discs and storehouses on small and medium harbours.',
    input: { kind: 'points', allowNegative: false },
    source: { book: 'rules', pages: '15, 16, 19' },
  },
  {
    id: 'pathfinder',
    number: 5,
    title: 'Pathfinder track',
    hint: 'The VP your disc has unlocked: shown next to or below it at the last VP space you reached (at most 15).',
    input: { kind: 'points', allowNegative: false, max: 15 },
    source: { book: 'rules', pages: '17, 19' },
  },
  {
    id: 'tiles',
    number: 6,
    title: 'Hazard and bonus tiles',
    hint: 'VP printed on the hazard tiles and bonus tiles in front of you.',
    input: { kind: 'points', allowNegative: false },
    source: p19,
  },
  {
    id: 'cards',
    number: 7,
    title: 'Bonus and sheep cards',
    hint: 'VP on the bonus cards (not bonus objective cards) and sheep cards in your whole deck.',
    input: { kind: 'points', allowNegative: false },
    source: p19,
  },
  {
    id: 'objectives',
    number: 8,
    title: 'Objective cards',
    hint: 'Fulfilled cards add their VP, unfulfilled ones subtract their penalty. Can be negative.',
    input: { kind: 'points', allowNegative: true },
    source: { book: 'rules', pages: '17, 19' },
  },
  {
    id: 'harbourmasters',
    number: 9,
    title: 'Harbourmaster tiles',
    hint: 'VP from the tasks on the lower half of your harbourmaster tiles.',
    input: { kind: 'points', allowNegative: false },
    source: p19,
  },
  {
    id: 'handLimit',
    number: 10,
    title: 'Hand limit disc space',
    hint: '3 VP if you cleared that disc space on your player board.',
    input: { kind: 'flag', points: 3 },
    source: p19,
  },
  {
    id: 'workers',
    number: 11,
    title: 'Workers and storehouses',
    hint: '4 VP per worker on the fifth space of a row, plus 2 and/or 4 VP for the cleared storehouse pairs.',
    input: { kind: 'points', allowNegative: false },
    source: p19,
  },
  {
    id: 'marketToken',
    number: 12,
    title: 'Bonus tiles market token',
    hint: '5 VP if the token is in front of you.',
    input: { kind: 'flag', points: 5 },
    source: p19,
  },
];

export const POUNDS_PER_VP = 5;

export const SCORING_RULES: readonly RuleItem[] = [
  {
    id: 'tie',
    text: 'Most victory points wins. A tie means a shared victory.',
    source: p19,
  },
  {
    id: 'objectives-deck',
    text: 'Objective cards still in your deck: for each, choose to add it to your objective area (without its immediate action) or remove it from the game. Cards already in the area must be scored.',
    source: { book: 'rules', pages: '17, 19' },
  },
  {
    id: 'objectives-tasks',
    text: 'Each fulfilled task counts toward one objective card only; repeated tasks must be met separately.',
    source: { book: 'rules', pages: '17' },
  },
];

export const HARBOURMASTER_TASKS: readonly RuleItem[] = [
  { id: 'certificates', text: '1 VP per certificate, permanent or temporary.', source: p19 },
  { id: 'storehouses', text: '1 VP per 2 storehouses on the sea routes board.', source: p19 },
  { id: 'objective-area', text: '1 VP per objective card in your objective area, fulfilled or not.', source: p19 },
  { id: 'buildings', text: '1 VP per private building on the board.', source: p19 },
  { id: 'hazards', text: '1 VP per hazard tile collected.', source: p19 },
  { id: 'ferries', text: '1 VP per card with a ferry in your deck (bonus cards of Set 1 included).', source: p19 },
  { id: 'pathfinder', text: '2 VP per 5 spaces advanced on the pathfinder track.', source: p19 },
  { id: 'workers', text: '1 VP per 2 worker tiles in your worker section, the printed ones included.', source: p19 },
];
