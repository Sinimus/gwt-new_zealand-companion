import type { RuleSection } from './types';

// Solo game against Sarah (ruling r171): her setup and a static reference of what her cards make
// her do. The app does not track Sarah's state; her cards and board do (r145, r156).

export const SOLO_SETUP: RuleSection = {
  id: 'solo-setup',
  title: 'Solo: changes to the setup',
  when: { playerCounts: [1] },
  items: [
    {
      id: 'material',
      text: 'Besides the usual material you need Sarah’s board, her 17 cards, the specialization tile and Sarah’s sheep market tile. Set up for 2 players with the changes below.',
      source: { book: 'solo', pages: '1' },
    },
    {
      id: 'difficulty',
      text: 'Pick a difficulty and remove cards from Sarah’s deck. Easy: #1, #6, #8 and #14 to #17. Medium: #14 to #17. Hard: #10 to #13.',
      source: { book: 'solo', pages: '1' },
    },
    {
      id: 'drawn-worker',
      text: 'After shuffling the tiles into the bags, draw one A tile until it is a worker and set it aside (hazards go back into the bag).',
      source: { book: 'solo', pages: '1' },
    },
    {
      id: 'step-tile',
      text: 'Only 1 step tile, on the orange 2-player space of the pathfinder track.',
      source: { book: 'solo', pages: '1' },
    },
    {
      id: 'sarah-colour',
      text: 'Sarah takes a colour with Sarah’s board instead of a player board. 15 discs and her 10 private buildings form her supply; her 16th disc goes on space 0 of the pathfinder track. Her buildings use the same sides as yours.',
      source: { book: 'solo', pages: '1' },
    },
    {
      id: 'sarah-pieces',
      text: 'Her runholder starts on the horseman space at the start of the trail, her ship on a starting water space. Her storehouses, certificate marker, gold marker and player sheep cards go back to the box.',
      source: { book: 'solo', pages: '1' },
    },
    {
      id: 'sarah-deck',
      text: 'Shuffle her cards for the chosen difficulty as a face-down deck next to her board.',
      source: { book: 'solo', pages: '1' },
    },
    {
      id: 'sarah-worker',
      text: 'The worker set aside goes in the leftmost free space of its row on Sarah’s board (she takes no steering wheel bonus card for it). The specialization tile marks her most numerous worker type. Sarah’s sheep market tile goes above her board.',
      source: { book: 'solo', pages: '1' },
    },
  ],
};

export const SOLO_REFERENCE: readonly RuleSection[] = [
  {
    id: 'your-turn',
    title: 'Your turns',
    items: [
      {
        id: 'fees',
        text: 'Fees for hands on Sarah’s buildings go to the bank.',
        source: { book: 'solo', pages: '2' },
      },
      {
        id: 'foresight-slide',
        text: 'After each delivery, slide the remaining foresight tiles to the right spaces before refilling the two left ones.',
        source: { book: 'solo', pages: '2' },
      },
      {
        id: 'objective-slide',
        text: 'The general objective display keeps an order: when a card is taken, slide the others away from the stack and refill the space next to the stack.',
        source: { book: 'solo', pages: '2' },
      },
    ],
  },
  {
    id: 'sarah-turn',
    title: 'Sarah’s turn',
    items: [
      {
        id: 'card',
        text: 'Draw her top card: first move her runholder as the card says, then do its action. Where she stops does not change the action. The card goes face up on her discard pile; reshuffle that pile when her deck is empty.',
        source: { book: 'solo', pages: '2' },
      },
      {
        id: 'no-money',
        text: 'She never gets money, gold or exchange tokens and has no flock deck. Cards she gains go face down in a stack next to her board.',
        source: { book: 'solo', pages: '2' },
      },
      {
        id: 'foresight',
        text: 'Foresight A and B: she takes the tile from the right space; slide the other tile right and refill on the left.',
        source: { book: 'solo', pages: '2' },
      },
      {
        id: 'wellington',
        text: 'In Wellington she skips Income. Her first delivery goes to local trading post 3 (easy), 6 (medium) or 9 (hard), each later one to the next higher local trading post, 21 again and again at the end. Her discs come from her supply.',
        source: { book: 'solo', pages: '2' },
      },
      {
        id: 'delivery-cards',
        text: 'An objective card from a delivery: the one farthest from the stack; slide and refill. A deck-building card: one of that kind face down to her stack.',
        source: { book: 'solo', pages: '2' },
      },
      {
        id: 'wellington-action',
        text: 'If she reaches Wellington, she still does her card action first, so she may act and deliver in the same turn.',
        source: { book: 'solo', pages: '2' },
      },
      {
        id: 'decisions',
        text: 'Her choices follow numbered criteria; on a tie go to the next one, and if a tie remains you choose. She does as much of an action as she can.',
        source: { book: 'solo', pages: '2' },
      },
      {
        id: 'specialization',
        text: 'Her specialization is her most numerous worker type. It changes only when another type gets strictly more workers; a tie keeps it.',
        source: { book: 'solo', pages: '2' },
      },
    ],
  },
  {
    id: 'sarah-movement',
    title: 'Sarah’s movement',
    items: [
      {
        id: 'steps',
        text: 'She moves the number of steps her card shows, by the normal movement rules; only Wellington stops her early. Cards #10 to #17 count workers (of her specialization or of the shown type): at least 1 step, at most 5.',
        source: { book: 'solo', pages: '2' },
      },
      {
        id: 'path',
        text: 'At a fork: 1. shortest path to Wellington, 2. lowest fee, 3. lowest fee to you. When she passes your buildings with hands, you take that fee from the bank.',
        source: { book: 'solo', pages: '2' },
      },
    ],
  },
  {
    id: 'sarah-actions',
    title: 'Sarah’s actions',
    items: [
      {
        id: 'hire',
        text: 'Hire (#1, #2): free of cost into the leftmost free space of the row. One card prefers the cheapest worker, then her specialization; the other the reverse. She takes a bonus card of the icon above that column, and does any immediate action of the space.',
        source: { book: 'solo', pages: '3' },
      },
      {
        id: 'buy-sheep',
        text: 'Buy sheep (#3, #10, #14): the option for her number of shepherds on her sheep market tile, choosing the most victory points, and among equal sheep the type with the fewest cards in the market. If the cards are not there, she adds 2 cards to the market and uses the option for one shepherd fewer (repeat as needed).',
        source: { book: 'solo', pages: '3-4' },
      },
      {
        id: 'buy-sheep-special',
        text: '#10 without the shepherd specialization: one Lincoln or Corriedale (the scarcer one). #14 the same plus one Dorset Horn; with the shepherd specialization she first adds 2 cards to the market for free.',
        source: { book: 'solo', pages: '3' },
      },
      {
        id: 'build',
        text: 'Build (#4, #11, #15): 1. new building with all her craftsmen, 2. with all but one, 3. replace with as many as possible, 4. build with as many as possible. Prefer buildings with a hand; for a replacement the most victory points, then the most hands. A new building goes on the next empty non-risk building space ahead of your runholder; pathfinder requirements apply.',
        source: { book: 'solo', pages: '3' },
      },
      {
        id: 'build-special',
        text: '#11 without the craftsman specialization: a new building needing 1 craftsman, or else an upgrade using 1 craftsman. #15 the same with 2 craftsmen.',
        source: { book: 'solo', pages: '3' },
      },
      {
        id: 'hazard',
        text: 'Remove a hazard (#8, #9): from the section with the highest single tile (tie: more tiles), the tile with the most victory points (tie: black hand), with its card.',
        source: { book: 'solo', pages: '4' },
      },
      {
        id: 'bonus-tile',
        text: 'Invest in a bonus tile (#5, #8): the cheapest, ignoring extra costs on the tile; tie: leftmost in the highest row. It goes back to the box.',
        source: { book: 'solo', pages: '4' },
      },
      {
        id: 'pathfinder',
        text: 'Pathfinder (#5, #6, #7, #12, #16): advance as shown, without rewards; scored normally at the end.',
        source: { book: 'solo', pages: '4' },
      },
      {
        id: 'objective',
        text: 'Gain one objective card (#7): the one farthest from the stack; it scores as fulfilled.',
        source: { book: 'solo', pages: '4' },
      },
      {
        id: 'sailor',
        text: 'Sailor action (#12, #16): the bonus card shown for her number of sailors; a bonus objective card scores as fulfilled.',
        source: { book: 'solo', pages: '4' },
      },
      {
        id: 'shearer',
        text: 'Shearer action (#13, #17): by her number of shearers a Romney, and with more shearers and by difficulty a Lincoln or Ryeland. Without the shearer specialization these cards add 1 or 2 steps after her normal move.',
        source: { book: 'solo', pages: '4' },
      },
      {
        id: 'harbour',
        text: 'Immediate harbourmaster action: her ship and a disc go to the lowest-value medium harbour without a disc, and that harbourmaster tile goes back to the box; if all have one, the lowest one with only your disc. She takes the harbour’s card.',
        source: { book: 'solo', pages: '3' },
      },
    ],
  },
  {
    id: 'sarah-scoring',
    title: 'Sarah’s score',
    items: [
      {
        id: 'categories',
        text: 'Scored as usual except categories 1 (pounds), 9 (harbourmaster tiles) and 10 (hand limit disc space), which give her nothing. All her objective cards count as fulfilled.',
        source: { book: 'solo', pages: '2' },
      },
      {
        id: 'difficulty-tip',
        text: 'To fine-tune difficulty, move her first delivery to a local trading post closer to 1 (easier) or to 21 (harder).',
        source: { book: 'solo', pages: '1' },
      },
    ],
  },
];
