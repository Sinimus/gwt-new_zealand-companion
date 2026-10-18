import type { RuleSource } from './types';

// The 11 sheep types (ruling r172, values read from the card images on Rulebook p. 3; card layout
// p. 6). Player sheep carry no victory points.

export type SheepId =
  | 'shropshire'
  | 'southdown'
  | 'english-leicester'
  | 'merino'
  | 'dorset-horn'
  | 'lincoln'
  | 'corriedale'
  | 'hampshire'
  | 'ryeland'
  | 'suffolk'
  | 'romney';

export type SheepGroup = 'player' | 'market' | 'supply';

export interface Sheep {
  id: SheepId;
  name: string;
  colour: string;
  group: SheepGroup;
  breedingValue: number;
  woolValue: number;
  victoryPoints: number;
  source: RuleSource;
}

const cards: RuleSource = { book: 'rules', pages: '3, 6' };

export const SHEEP: readonly Sheep[] = [
  { id: 'shropshire', name: 'Shropshire', colour: 'grey', group: 'player', breedingValue: 1, woolValue: 1, victoryPoints: 0, source: cards },
  { id: 'southdown', name: 'Southdown', colour: 'black', group: 'player', breedingValue: 2, woolValue: 1, victoryPoints: 0, source: cards },
  { id: 'english-leicester', name: 'English Leicester', colour: 'green', group: 'player', breedingValue: 2, woolValue: 2, victoryPoints: 0, source: cards },
  { id: 'merino', name: 'Merino', colour: 'white', group: 'player', breedingValue: 2, woolValue: 3, victoryPoints: 0, source: cards },
  { id: 'dorset-horn', name: 'Dorset Horn', colour: 'orange', group: 'market', breedingValue: 3, woolValue: 3, victoryPoints: 1, source: cards },
  { id: 'lincoln', name: 'Lincoln', colour: 'red', group: 'market', breedingValue: 2, woolValue: 4, victoryPoints: 2, source: cards },
  { id: 'corriedale', name: 'Corriedale', colour: 'yellow', group: 'market', breedingValue: 3, woolValue: 2, victoryPoints: 2, source: cards },
  { id: 'hampshire', name: 'Hampshire', colour: 'blue', group: 'market', breedingValue: 4, woolValue: 2, victoryPoints: 3, source: cards },
  { id: 'ryeland', name: 'Ryeland', colour: 'brown', group: 'market', breedingValue: 2, woolValue: 5, victoryPoints: 4, source: cards },
  { id: 'suffolk', name: 'Suffolk', colour: 'purple', group: 'market', breedingValue: 6, woolValue: 3, victoryPoints: 7, source: cards },
  { id: 'romney', name: 'Romney', colour: 'pink', group: 'supply', breedingValue: 3, woolValue: 2, victoryPoints: 3, source: cards },
];

// Local wool trading posts on the sea routes board (Rulebook p. 16). Post 13 takes any number of
// your discs; the others one each.
export const LOCAL_WOOL_POSTS: readonly number[] = [5, 9, 13];

export interface SheepPurchase {
  id: string;
  shepherds: 1 | 2 | 3 | 4;
  pounds: number;
  text: string;
}

// Buying sheep (Rulebook p. 14). Split your shepherds among these options; each shepherd is used
// once per action. Only sheep currently in the market can be bought.
export const SHEEP_PURCHASES: readonly SheepPurchase[] = [
  { id: 'dorset-3', shepherds: 1, pounds: 3, text: '1 Dorset Horn' },
  { id: 'corriedale-lincoln-5', shepherds: 1, pounds: 5, text: '1 Corriedale or Lincoln' },
  { id: 'hampshire-ryeland-9', shepherds: 1, pounds: 9, text: '1 Hampshire or Ryeland' },
  { id: 'dorset-1', shepherds: 2, pounds: 1, text: '1 Dorset Horn' },
  { id: 'corriedale-lincoln-2', shepherds: 2, pounds: 2, text: '1 Corriedale or Lincoln' },
  { id: 'suffolk-10', shepherds: 2, pounds: 10, text: '1 Suffolk and 1 exchange token' },
  { id: 'two-vp2-3', shepherds: 3, pounds: 3, text: 'Exactly 2 sheep worth 2 victory points each' },
  { id: 'suffolk-4', shepherds: 4, pounds: 4, text: '1 Suffolk and 1 exchange token' },
];

export const SHEEP_PURCHASE_SOURCE: RuleSource = { book: 'rules', pages: '14' };
