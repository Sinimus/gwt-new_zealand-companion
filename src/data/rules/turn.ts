import type { RuleItem, RuleSection } from './types';

// A turn (Rulebook p. 6-11), Wellington (p. 8-11) and the bonus tiles market token (p. 10-11, 19).

export const TURN_PHASES: readonly RuleSection[] = [
  {
    id: 'phase-a',
    title: 'Phase A: move your runholder',
    items: [
      {
        id: 'steps',
        text: 'Move at least 1 step and at most your step limit. Every building tile, hazard tile and Wellington is one step; empty spaces do not count.',
        source: { book: 'rules', pages: '7' },
      },
      {
        id: 'direction',
        text: 'Always forward along the arrows; at a fork pick one path. Wellington ends the move: you cannot pass it. Other runholders never block you.',
        source: { book: 'rules', pages: '7' },
      },
      {
        id: 'fees',
        text: 'Entering or passing a location with a hand costs a fee at once: black hand 1 pound, green hand 2 pounds. Hazards pay the bank, an opponent’s building pays its owner.',
        source: { book: 'rules', pages: '7' },
      },
      {
        id: 'no-money',
        text: 'If you cannot pay a fee, pay what you can and keep moving. Fees are never paid later. This applies to hand fees only; every other cost must be paid in full.',
        source: { book: 'rules', pages: '7' },
      },
    ],
  },
  {
    id: 'phase-b',
    title: 'Phase B: use your location',
    items: [
      {
        id: 'own-neutral',
        text: 'Neutral building or your own building: each of its local actions once, in any order, or instead one single auxiliary action.',
        source: { book: 'rules', pages: '8' },
      },
      {
        id: 'opponent-hazard',
        text: 'Opponent’s building or hazard: one single auxiliary action only.',
        source: { book: 'rules', pages: '8' },
      },
      {
        id: 'wellington',
        text: 'Wellington: all 4 subphases in order (see Wellington).',
        source: { book: 'rules', pages: '8' },
      },
      {
        id: 'requirements',
        text: 'An action with a cost or requirement gives its reward only if you pay or meet it fully. You may skip a reward, but pounds and cards from delivery actions must be taken.',
        source: { book: 'rules', pages: '8, 12' },
      },
      {
        id: 'cards',
        text: 'Objective, deck-building and bonus cards are played before phase A or before or after a single action in phase B, never in the middle of a move or an action. After playing a deck-building or bonus card (not a sheep or objective card), draw a card.',
        source: { book: 'rules', pages: '17, 20' },
      },
    ],
  },
  {
    id: 'phase-c',
    title: 'Phase C: draw up to your hand limit',
    items: [
      {
        id: 'draw',
        text: 'Draw from your draw stack up to your hand limit (4 at the start, up to 6). When the draw stack is empty, shuffle your discard pile into a new one.',
        source: { book: 'rules', pages: '6, 11' },
      },
      {
        id: 'no-play',
        text: 'No deck-building or bonus cards may be played in this phase.',
        source: { book: 'rules', pages: '11' },
      },
    ],
  },
];

export const WELLINGTON_SUBPHASES: readonly RuleSection[] = [
  {
    id: 'income',
    title: '1. Income',
    items: [
      {
        id: 'reveal',
        text: 'Show sheep from your hand, each type only once. Their breeding values add up; wool values and VP do not count, and non-sheep cards cannot be shown.',
        source: { book: 'rules', pages: '9' },
      },
      {
        id: 'certificates',
        text: 'Add certificates if you want: temporary ones by moving your certificate marker back, plus every permanent certificate (cleared disc spaces and harbourmaster tiles).',
        source: { book: 'rules', pages: '9' },
      },
      {
        id: 'take',
        text: 'Take that many pounds and keep them apart to remember the total for the delivery. Discard the shown cards; duplicates stay in your hand.',
        source: { book: 'rules', pages: '9' },
      },
    ],
  },
  {
    id: 'delivery',
    title: '2. Delivery',
    items: [
      {
        id: 'post',
        text: 'Choose a trading post whose value is at most your total. You cannot pick a post that already has your disc, except local trading posts 0 and 21.',
        source: { book: 'rules', pages: '9' },
      },
      {
        id: 'disc',
        text: 'Move a disc from your player board onto it. A disc from a white-cornered space fits any post; one from a dark-cornered space only a dark-cornered post. The cleared space unlocks its ability (some cost or pay pounds).',
        source: { book: 'rules', pages: '9' },
      },
      {
        id: 'reward',
        text: 'Do the delivery action of the post at once. Post 0 gives 6 pounds now and -8 VP per disc at the end.',
        source: { book: 'rules', pages: '10' },
      },
      {
        id: 'transport',
        text: 'Pay any transport costs (mostly on dark-cornered spaces). If you cannot pay them together with the cost of the cleared disc space, choose another combination.',
        source: { book: 'rules', pages: '10' },
      },
    ],
  },
  {
    id: 'foresight-a',
    title: '3. Foresight A',
    items: [
      {
        id: 'take',
        text: 'Take one of the 2 tiles next to spot 3 and move it to its section at once (see where tiles go).',
        source: { book: 'rules', pages: '9-10' },
      },
    ],
  },
  {
    id: 'foresight-b',
    title: '4. Foresight B',
    items: [
      {
        id: 'take',
        text: 'Take one of the 2 tiles next to spot 4 and move it to its section at once.',
        source: { book: 'rules', pages: '9-10' },
      },
    ],
  },
  {
    id: 'after',
    title: 'Afterwards',
    items: [
      {
        id: 'start',
        text: 'Put your runholder on the horseman space at the start of the trail.',
        source: { book: 'rules', pages: '11' },
      },
      {
        id: 'refill',
        text: 'Refill the 2 empty foresight spaces from the bag with the matching letter, face up.',
        source: { book: 'rules', pages: '11' },
      },
    ],
  },
];

export const FORESIGHT_PLACEMENT: readonly RuleItem[] = [
  {
    id: 'worker',
    text: 'Worker: the highest (most expensive) free space of its column in the job market; none free, back to the box.',
    source: { book: 'rules', pages: '10' },
  },
  {
    id: 'hazard',
    text: 'Hazard: the free space with the lowest number in its section (flood or rockfall); none free, back to the box.',
    source: { book: 'rules', pages: '10' },
  },
  {
    id: 'bonus',
    text: 'Bonus tile: the next free space, left to right, in the row of the market token (with 3 players the left column stays empty, with 2 the two left columns). Filling the token’s space moves the token along its arrow to the next row.',
    source: { book: 'rules', pages: '10' },
  },
];

export interface MarketArrow {
  id: 'black' | 'yellow' | 'turquoise' | 'red';
  label: string;
  item: RuleItem;
}

export const MARKET_ARROWS: readonly MarketArrow[] = [
  {
    id: 'black',
    label: 'Black arrow',
    item: {
      id: 'black',
      text: 'Nothing else happens.',
      source: { book: 'rules', pages: '11' },
    },
  },
  {
    id: 'yellow',
    label: 'Yellow arrow',
    item: {
      id: 'yellow',
      text: 'Something happens at once: either the sheep market is refilled or the four neutral buildings flip. The flip belongs to the turquoise arrow, so here the sheep market is refilled.',
      source: { book: 'rules', pages: '11' },
    },
  },
  {
    id: 'turquoise',
    label: 'Turquoise arrow',
    item: {
      id: 'turquoise',
      text: 'Flip the four neutral buildings marked I (B, C, G, H) to their II side for the rest of the game.',
      source: { book: 'rules', pages: '11' },
    },
  },
  {
    id: 'red',
    label: 'Red arrow (out of the bottom row)',
    item: {
      id: 'red',
      text: 'End of the game: whoever placed the tile takes the token (5 VP), refills foresight and has had the last turn. Every other player gets one more turn without phase C; a tile taken from foresight B in that turn leaves the game.',
      source: { book: 'rules', pages: '11, 19' },
    },
  },
];

export const SHEEP_MARKET_REFILL: readonly RuleItem[] = [
  {
    id: 'refill-2',
    text: 'Refill from the market stack up to 9 cards.',
    source: { book: 'rules', pages: '11' },
    when: { playerCounts: [1, 2] },
  },
  {
    id: 'refill-3',
    text: 'Refill from the market stack up to 11 cards.',
    source: { book: 'rules', pages: '11' },
    when: { playerCounts: [3] },
  },
  {
    id: 'refill-4',
    text: 'Refill from the market stack up to 14 cards.',
    source: { book: 'rules', pages: '11' },
    when: { playerCounts: [4] },
  },
  {
    id: 'refill-order',
    text: 'Sort by colour as in the setup. With that many cards or more already there, add nothing; an empty stack adds nothing. Buying sheep does not refill the market, but each unused shepherd may add 2 cards to it.',
    source: { book: 'rules', pages: '11, 14' },
  },
];
