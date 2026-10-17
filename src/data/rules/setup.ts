import type { RuleSection } from './types';

// Setup in the order of the Rulebook (p. 4-5). The solo game is set up as a 2-player game
// with the changes listed in the Sarah section (Solo p. 1).

const ONE_OR_TWO = [1, 2] as const;

export const SETUP_SECTIONS: readonly RuleSection[] = [
  {
    id: 'board',
    title: 'Game board',
    items: [
      {
        id: 'boards',
        text: 'Game board in the middle of the table, sea routes board above it.',
        source: { book: 'rules', pages: '4' },
      },
      {
        id: 'harbourmasters',
        text: 'Shuffle the 8 harbourmaster tiles and put one face up on each of the 5 harbourmaster spaces of the sea routes board. The other 3 go back to the box.',
        source: { book: 'rules', pages: '4' },
      },
      {
        id: 'neutral-buildings',
        text: 'Put the 8 neutral buildings front side up on the 8 neutral spaces (the four double-sided ones show their I side). In your first game each goes on the space with its letter, A to H. Later you may shuffle them and place them at random, still front side up.',
        source: { book: 'rules', pages: '4' },
      },
      {
        id: 'market-token',
        text: 'The bonus tiles market token goes on the top dashed round space of the bonus tiles market.',
        source: { book: 'rules', pages: '4' },
      },
      {
        id: 'bags',
        text: 'Turn the worker, hazard and bonus tiles face down and sort them into bag A and bag B by the letter on their back. The two bags next to Wellington are the Wellington supply.',
        source: { book: 'rules', pages: '4' },
      },
      {
        id: 'job-market-first',
        text: 'Job market: first take 1 worker of each of the 4 types from the A tiles and put them on the marked spaces of the top row.',
        source: { book: 'rules', pages: '4' },
      },
      {
        id: 'job-market-2',
        text: 'Then draw 12 tiles from bag A.',
        source: { book: 'rules', pages: '4' },
        when: { playerCounts: ONE_OR_TWO },
      },
      {
        id: 'job-market-3',
        text: 'Then draw 13 tiles from bag A.',
        source: { book: 'rules', pages: '4' },
        when: { playerCounts: [3] },
      },
      {
        id: 'job-market-4',
        text: 'Then draw 14 tiles from bag A.',
        source: { book: 'rules', pages: '4' },
        when: { playerCounts: [4] },
      },
      {
        id: 'job-market-placing',
        text: 'A drawn worker goes on the highest empty space of its own column (the most expensive one). A drawn hazard goes in its section (flood or rockfall) on the empty space with the lowest number. If its column or section is full, return the tile to the bag and draw another.',
        source: { book: 'rules', pages: '4' },
      },
      {
        id: 'bonus-market-2',
        text: 'Bonus tiles market: draw B tiles one by one. Start in the top row under the 2-player sign and go right; continue in the second row from the same column, and stop with the space left of the market token. That makes 3 tiles; the two left columns stay empty.',
        source: { book: 'rules', pages: '4, 10' },
        when: { playerCounts: ONE_OR_TWO },
      },
      {
        id: 'bonus-market-3',
        text: 'Bonus tiles market: draw B tiles one by one. Start in the top row under the 3-player sign and go right; continue in the second row from the same column, and stop with the space left of the market token. That makes 5 tiles; the left column stays empty.',
        source: { book: 'rules', pages: '4, 10' },
        when: { playerCounts: [3] },
      },
      {
        id: 'bonus-market-4',
        text: 'Bonus tiles market: draw B tiles one by one. Start in the top row under the 4-player sign and go right; continue in the second row from the same column, and stop with the space left of the market token. That makes 7 tiles.',
        source: { book: 'rules', pages: '4, 10' },
        when: { playerCounts: [4] },
      },
      {
        id: 'foresight',
        text: 'Foresight spaces in Wellington: 2 tiles from bag A on the two A spaces, 2 tiles from bag B on the two B spaces, all face up.',
        source: { book: 'rules', pages: '4' },
      },
      {
        id: 'sheep-market-2',
        text: 'Shuffle the 37 market sheep cards into a face-down market stack and draw 9 cards. Lay them out below the board, sorted by colour: orange, red, yellow, blue, brown, purple.',
        source: { book: 'rules', pages: '4' },
        when: { playerCounts: ONE_OR_TWO },
      },
      {
        id: 'sheep-market-3',
        text: 'Shuffle the 37 market sheep cards into a face-down market stack and draw 11 cards. Lay them out below the board, sorted by colour: orange, red, yellow, blue, brown, purple.',
        source: { book: 'rules', pages: '4' },
        when: { playerCounts: [3] },
      },
      {
        id: 'sheep-market-4',
        text: 'Shuffle the 37 market sheep cards into a face-down market stack and draw 14 cards. Lay them out below the board, sorted by colour: orange, red, yellow, blue, brown, purple.',
        source: { book: 'rules', pages: '4' },
        when: { playerCounts: [4] },
      },
      {
        id: 'objectives',
        text: 'Shuffle the 24 objective cards into a face-down stack right of the board and turn 4 face up below it: the general objective display.',
        source: { book: 'rules', pages: '4' },
      },
      {
        id: 'deck-building',
        text: 'Deck-building supply left of the board: the Romney sheep, Sheepdog, Ferry and Kōtare bird cards, optionally with their additional cards tiles above them.',
        source: { book: 'rules', pages: '4' },
      },
      {
        id: 'bonus-cards',
        text: 'Bonus cards: take the white-star card of each of the 10 sets, shuffle them, keep 4 at random and return the other 6. Each kept set gets more of its own cards (see below). Lowest set number goes under the steering wheel tile, then barrel, then bell; the highest under the compass.',
        source: { book: 'rules', pages: '5' },
      },
      {
        id: 'bonus-cards-2',
        text: 'Add 2 cards to each kept star card: 3 cards per set.',
        source: { book: 'rules', pages: '5' },
        when: { playerCounts: ONE_OR_TWO },
      },
      {
        id: 'bonus-cards-3',
        text: 'Add 4 cards to each kept star card: 5 cards per set.',
        source: { book: 'rules', pages: '5' },
        when: { playerCounts: [3] },
      },
      {
        id: 'bonus-cards-4',
        text: 'Add all 5 remaining cards to each kept star card: 6 cards per set.',
        source: { book: 'rules', pages: '5' },
        when: { playerCounts: [4] },
      },
      {
        id: 'step-tiles-2',
        text: 'Put 2 step tiles on the orange space for your player count beside the pathfinder track.',
        source: { book: 'rules', pages: '5' },
        when: { playerCounts: [2] },
      },
      {
        id: 'step-tiles-3',
        text: 'Put 3 step tiles on the orange space beside space 4 of the pathfinder track.',
        source: { book: 'rules', pages: '5' },
        when: { playerCounts: [3] },
      },
      {
        id: 'step-tiles-4',
        text: 'Put 4 step tiles on the orange space beside space 6 of the pathfinder track.',
        source: { book: 'rules', pages: '5' },
        when: { playerCounts: [4] },
      },
      {
        id: 'bank',
        text: 'Coins and exchange tokens form the bank. The neutral buildings overview tile goes next to the board.',
        source: { book: 'rules', pages: '5' },
      },
    ],
  },
  {
    id: 'players',
    title: 'Each player',
    items: [
      {
        id: 'board-tiles',
        text: 'Player board of your colour, plus a player count tile and a fee tile in its Phase A box. The fee tile shows the side with the two coins (-1 and -2).',
        source: { book: 'rules', pages: '5' },
      },
      {
        id: 'private-buildings',
        text: 'Your 10 private building tiles above your board in order of craftsmen needed. First games: all on side a. Later: one player decides each side at random and everyone copies it; nobody flips a tile on purpose afterwards.',
        source: { book: 'rules', pages: '5' },
      },
      {
        id: 'pieces',
        text: '16 discs on the 16 round disc spaces, 10 storehouses on the 10 square spaces, ship on a starting water space of the sea routes board, certificate marker next to 0, gold marker next to 1 (you start with 1 gold), runholder beside your board.',
        source: { book: 'rules', pages: '5' },
      },
      {
        id: 'flock',
        text: 'Your 14 player sheep cards are your flock deck: 5 Shropshire, 3 Southdown, 3 English Leicester, 3 Merino. Shuffle them as your face-down draw stack left of your board.',
        source: { book: 'rules', pages: '3, 5' },
      },
    ],
  },
  {
    id: 'start',
    title: 'Starting player and capital',
    items: [
      {
        id: 'capital',
        text: 'Pick a starting player; play goes clockwise. 1st player: 7 pounds and 4 cards. 2nd: 8 pounds, 5 cards. 3rd: 9 pounds, 6 cards. 4th: 10 pounds, 7 cards. Everyone also takes 1 exchange token.',
        source: { book: 'rules', pages: '5' },
        when: { playerCounts: [2, 3, 4] },
      },
      {
        id: 'capital-solo',
        text: 'You go first: 7 pounds, 1 exchange token and 4 cards. Sarah gets no money, no exchange token and no cards.',
        source: { book: 'solo', pages: '1' },
        when: { playerCounts: [1] },
      },
      {
        id: 'first-turn',
        text: 'At the start of your very first turn: discard down to 4 cards, put a disc from a white-cornered disc space on space 0 of the pathfinder track, put your runholder on any neutral building and go straight to phase B.',
        source: { book: 'rules', pages: '5' },
      },
    ],
  },
];
