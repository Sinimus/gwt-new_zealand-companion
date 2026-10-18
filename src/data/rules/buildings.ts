import type { RuleItem, RuleSource } from './types';

// Buildings from the Rules Appendix (p. 1-3). Neutral buildings carry the letters A to H; the four
// marked I on the front (B, C, G, H) flip to their II side during the game (Rulebook p. 3, 11).
// Private buildings 1 to 10 have an a side and a b side, the same for every player (Rulebook p. 5).

export type NeutralLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export interface NeutralBuilding {
  letter: NeutralLetter;
  front: readonly string[];
  // Only the four flipping buildings have a back (II side).
  back?: readonly string[];
  source: RuleSource;
}

export type Hand = 'black' | 'green';

export interface PrivateBuilding {
  id: string;
  number: number;
  side: 'a' | 'b';
  craftsmen: number;
  victoryPoints: number;
  // Fee a passing opponent pays to the owner (Rulebook p. 7).
  hand?: Hand;
  actions: readonly string[];
  source: RuleSource;
}

const appendix = (pages: string): RuleSource => ({ book: 'appendix', pages });

export const NEUTRAL_BUILDINGS: readonly NeutralBuilding[] = [
  {
    letter: 'A',
    front: [
      'Discard 2 sheep cards of the same type: gain 2 pounds.',
      'Hire a worker at its hiring cost.',
      'Hire another worker; its cost is 3 pounds higher.',
    ],
    source: appendix('1'),
  },
  {
    letter: 'B',
    front: [
      'Advance 2 spaces on the pathfinder track, or gain one objective card.',
      'Move your ship up to as many spaces as you have sailors (and/or upgrade a harbour).',
    ],
    back: [
      'One single auxiliary action, or gain one objective card.',
      'Advance 2 spaces on the pathfinder track.',
    ],
    source: appendix('1'),
  },
  {
    letter: 'C',
    front: [
      'Move your gold marker 1 space forward.',
      'One single or double auxiliary action.',
      'Invest in a bonus tile at its cost.',
    ],
    back: [
      'One single or double auxiliary action.',
      'Invest in a bonus tile at its cost.',
      'Invest in another bonus tile; its cost is 3 pounds higher.',
    ],
    source: appendix('1'),
  },
  {
    letter: 'D',
    front: [
      'Discard 1 English Leicester: gain 2 pounds.',
      'Place one of your private buildings on an empty building space, or replace one of yours; 2 pounds per craftsman needed.',
    ],
    source: appendix('1'),
  },
  {
    letter: 'E',
    front: [
      'Shear your sheep: show sheep of different types, at most one per shearer, and gain their wool values plus your permanent wool; a wool trading post may take a disc. Each shearer you do not use lets you draw 1 card and discard 1.',
      'One single auxiliary action.',
    ],
    source: appendix('1'),
  },
  {
    letter: 'F',
    front: ['Discard 1 Southdown: gain 3 pounds.', 'Buy sheep from the sheep market.'],
    source: appendix('1'),
  },
  {
    letter: 'G',
    front: [
      'Move your ship up to as many spaces as you have sailors (and/or upgrade a harbour).',
      'Move your ship 1 space (or upgrade a harbour).',
      'One single auxiliary action.',
    ],
    back: [
      'Move your ship up to as many spaces as you have sailors (and/or upgrade a harbour).',
      'The same move once more.',
    ],
    source: appendix('1'),
  },
  {
    letter: 'H',
    front: [
      'Shear one sheep: gain its wool value plus your permanent wool; a wool trading post may take a disc.',
      'Invest in a bonus tile at its cost.',
      'Remove a hazard for 5 pounds and take the card shown on it.',
    ],
    back: [
      'One single or double auxiliary action, or gain one objective card.',
      'Remove a hazard for 5 pounds and take the card shown on it.',
    ],
    source: appendix('1'),
  },
];

export const FLIPPING_LETTERS: readonly NeutralLetter[] = NEUTRAL_BUILDINGS.filter(
  (building) => building.back !== undefined,
).map((building) => building.letter);

export const PRIVATE_BUILDINGS: readonly PrivateBuilding[] = [
  {
    id: '1a',
    number: 1,
    side: 'a',
    craftsmen: 1,
    victoryPoints: 1,
    hand: 'black',
    actions: [
      'Gain 2 pounds for each of your private buildings in the lush grass (a building space with a grass icon), 1a included.',
      'One single auxiliary action.',
    ],
    source: appendix('2'),
  },
  {
    id: '2a',
    number: 2,
    side: 'a',
    craftsmen: 1,
    victoryPoints: 1,
    actions: [
      'One single or double auxiliary action.',
      'Move your runholder 1 step forward and do phase B again there.',
    ],
    source: appendix('2'),
  },
  {
    id: '3a',
    number: 3,
    side: 'a',
    craftsmen: 2,
    victoryPoints: 3,
    actions: [
      'Shear up to 2 sheep of different types: gain their wool values plus your permanent wool; a wool trading post may take a disc.',
      'Invest in a bonus tile at its cost.',
    ],
    source: appendix('2'),
  },
  {
    id: '4a',
    number: 4,
    side: 'a',
    craftsmen: 2,
    victoryPoints: 3,
    hand: 'black',
    actions: [
      'Hire a worker; its cost is 2 pounds lower.',
      'Draw up to 2 cards, then discard as many as you drew.',
    ],
    source: appendix('2'),
  },
  {
    id: '5a',
    number: 5,
    side: 'a',
    craftsmen: 3,
    victoryPoints: 4,
    actions: [
      'Move your ship up to as many spaces as you have sailors (and/or upgrade a harbour).',
      'Move your runholder up to 2 steps forward and do phase B again there.',
    ],
    source: appendix('2'),
  },
  {
    id: '6a',
    number: 6,
    side: 'a',
    craftsmen: 4,
    victoryPoints: 5,
    hand: 'green',
    actions: [
      'For every 2 hazard tiles you have collected: gain 7 pounds and advance 2 spaces on the pathfinder track. You keep the tiles.',
    ],
    source: appendix('2'),
  },
  {
    id: '7a',
    number: 7,
    side: 'a',
    craftsmen: 5,
    victoryPoints: 6,
    actions: [
      'Shear up to 3 sheep of different types: gain their wool values plus your permanent wool; a wool trading post may take a disc.',
      'Move your ship up to 3 spaces (and/or upgrade a harbour).',
    ],
    source: appendix('2'),
  },
  {
    id: '8a',
    number: 8,
    side: 'a',
    craftsmen: 7,
    victoryPoints: 9,
    hand: 'black',
    actions: [
      'Gain 7 pounds.',
      'Move your runholder up to 3 steps forward and do phase B again there.',
    ],
    source: appendix('2'),
  },
  {
    id: '9a',
    number: 9,
    side: 'a',
    craftsmen: 9,
    victoryPoints: 13,
    actions: [
      'Hire a worker; its cost is 3 pounds lower.',
      'Invest in a bonus tile at its cost.',
      'Remove a hazard for free and take the card shown on it.',
    ],
    source: appendix('2'),
  },
  {
    id: '10a',
    number: 10,
    side: 'a',
    craftsmen: 10,
    victoryPoints: 15,
    actions: [
      'Gain 7 pounds.',
      'Put a disc on wool trading post 13 by the usual rules: pay its 7 pounds delivery cost and take a Romney. Each disc there is worth 3 victory points at the end.',
    ],
    source: appendix('2'),
  },
  {
    id: '1b',
    number: 1,
    side: 'b',
    craftsmen: 1,
    victoryPoints: 1,
    hand: 'black',
    actions: [
      'Move your certificate marker 1 space forward for each of your private buildings in the lush grass, 1b included.',
      'One single auxiliary action.',
    ],
    source: appendix('3'),
  },
  {
    id: '2b',
    number: 2,
    side: 'b',
    craftsmen: 1,
    victoryPoints: 1,
    actions: [
      'One single auxiliary action.',
      'Move your runholder up to 2 steps forward and do phase B again there.',
    ],
    source: appendix('3'),
  },
  {
    id: '3b',
    number: 3,
    side: 'b',
    craftsmen: 2,
    victoryPoints: 3,
    hand: 'black',
    actions: [
      'Discard 2 sheep cards of the same type: gain 3 pounds.',
      'Invest in a bonus tile at its cost.',
    ],
    source: appendix('3'),
  },
  {
    id: '4b',
    number: 4,
    side: 'b',
    craftsmen: 2,
    victoryPoints: 3,
    actions: [
      'Gain 2 pounds for each shepherd in your shepherd row.',
      'Draw up to 3 cards, then discard as many as you drew.',
    ],
    source: appendix('3'),
  },
  {
    id: '5b',
    number: 5,
    side: 'b',
    craftsmen: 3,
    victoryPoints: 4,
    hand: 'black',
    actions: [
      'Gain 1 pound for each storehouse you have on the sea routes board.',
      'Move your runholder up to 2 steps forward and do phase B again there.',
    ],
    source: appendix('3'),
  },
  {
    id: '6b',
    number: 6,
    side: 'b',
    craftsmen: 4,
    victoryPoints: 5,
    actions: [
      'Discard 1 sheep card of any type: move your gold marker 1 space forward and gain 5 pounds.',
      'Advance 3 spaces on the pathfinder track.',
    ],
    source: appendix('3'),
  },
  {
    id: '7b',
    number: 7,
    side: 'b',
    craftsmen: 5,
    victoryPoints: 6,
    actions: ['Gain 6 pounds.', 'Take a Romney from the supply onto your discard pile.'],
    source: appendix('3'),
  },
  {
    id: '8b',
    number: 8,
    side: 'b',
    craftsmen: 6,
    victoryPoints: 8,
    hand: 'green',
    actions: [
      'Gain 1 exchange token.',
      'Gain 5 pounds.',
      'Move your runholder up to 3 steps forward and do phase B again there.',
    ],
    source: appendix('3'),
  },
  {
    id: '9b',
    number: 9,
    side: 'b',
    craftsmen: 8,
    victoryPoints: 12,
    hand: 'black',
    actions: [
      'One single or double auxiliary action.',
      'Move your certificate marker up to 2 spaces forward.',
      'Advance 4 spaces on the pathfinder track.',
    ],
    source: appendix('3'),
  },
  {
    id: '10b',
    number: 10,
    side: 'b',
    craftsmen: 10,
    victoryPoints: 15,
    actions: [
      'Move your ship up to 3 spaces (and/or upgrade a harbour).',
      'Put one of your storehouses on a harbour up to 7 spaces from your ship (placing it counts as one of the 7).',
    ],
    source: appendix('3'),
  },
];

// How neutral buildings change during the game (Rulebook p. 3, 4, 11).
export const NEUTRAL_RULES: readonly RuleItem[] = [
  {
    id: 'flip-when',
    text: 'When the bonus tiles market token moves along the turquoise arrow, the four buildings marked I (B, C, G, H) flip to their II side and stay flipped until the end. Their front actions are gone.',
    source: { book: 'rules', pages: '11' },
  },
  {
    id: 'flip-runholders',
    text: 'Runholders on a flipped building stay on it and move on from there as usual.',
    source: { book: 'rules', pages: '11' },
  },
  {
    id: 'local-or-aux',
    text: 'On a neutral building or your own building: use each of its local actions once, in any order, or instead one single auxiliary action. On an opponent’s building or a hazard: only one single auxiliary action.',
    source: { book: 'rules', pages: '8' },
  },
  {
    id: 'slash',
    text: 'Two actions split by a white slash: you may do only one of them.',
    source: { book: 'rules', pages: '8' },
  },
  {
    id: 'risk',
    text: 'A private building on a space with a risk action adds that action to its local actions for its owner.',
    source: { book: 'rules', pages: '8' },
  },
];
