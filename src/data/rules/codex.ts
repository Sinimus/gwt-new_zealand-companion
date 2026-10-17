import type { RuleSection } from './types';

// Codex topics: rules people look up at the table. Searchable by title, tags and text.

export type CodexCategory = 'Actions' | 'Resources' | 'Workers' | 'Cards' | 'Board' | 'Game end';

export interface CodexTopic extends RuleSection {
  category: CodexCategory;
  tags: readonly string[];
}

export const CODEX_TOPICS: readonly CodexTopic[] = [
  {
    id: 'exchange-token',
    title: 'Exchange token',
    category: 'Resources',
    tags: ['token', 'draw', 'discard', 'shropshire'],
    items: [
      {
        id: 'use',
        text: 'Usable at any time, even mid-action or on another player’s turn: return it, draw up to 2 cards, then discard as many as you drew.',
        source: { book: 'rules', pages: '18' },
      },
      {
        id: 'combine',
        text: 'Or return 2 tokens to remove a Shropshire from your hand from the game and move your gold marker 1 space forward.',
        source: { book: 'rules', pages: '18' },
      },
      {
        id: 'snapshot',
        text: 'Not while showing cards in Income or while shearing: those are a snapshot of your hand.',
        source: { book: 'rules', pages: '20' },
      },
      {
        id: 'gain',
        text: 'You start with 1. More come from buying a Suffolk, a shepherd row space, building 8b and some bonus tiles.',
        source: { book: 'rules', pages: '18' },
      },
    ],
  },
  {
    id: 'hand-limit',
    title: 'Hand limit',
    category: 'Resources',
    tags: ['cards', 'limit', 'draw', 'phase c'],
    items: [
      {
        id: 'limit',
        text: 'Starts at 4 and can reach 6 by clearing the two hand limit disc spaces, which cost 3 and 8 pounds when cleared.',
        source: { book: 'rules', pages: '9, 11' },
      },
      {
        id: 'draw',
        text: 'You draw up to it only in phase C. There is no discarding down when you hold more.',
        source: { book: 'rules', pages: '11' },
      },
      {
        id: 'vp',
        text: 'The right hand limit disc space gives 3 VP at the end once cleared.',
        source: { book: 'rules', pages: '9, 19' },
      },
    ],
  },
  {
    id: 'certificates',
    title: 'Certificates',
    category: 'Resources',
    tags: ['certificate', 'income', 'breeding', 'wellington'],
    items: [
      {
        id: 'temporary',
        text: 'Temporary certificates are the number next to your certificate marker. The limit is 3, or 5 after clearing its disc space. Spend any of them in Income by moving the marker back.',
        source: { book: 'rules', pages: '9, 12' },
      },
      {
        id: 'permanent',
        text: 'Permanent certificates come from cleared disc spaces and harbourmaster tiles and add 1 each to every Income.',
        source: { book: 'rules', pages: '9' },
      },
      {
        id: 'gold',
        text: 'Moving the marker forward from 0 or 1 to 2 or more also moves your gold marker 1 space.',
        source: { book: 'rules', pages: '12' },
      },
      {
        id: 'breeding',
        text: 'Certificates raise the breeding value total in Income, not the wool value.',
        source: { book: 'rules', pages: '9, 16' },
      },
    ],
  },
  {
    id: 'gold',
    title: 'Gold and bonus cards',
    category: 'Resources',
    tags: ['gold', 'bonus card', 'steering wheel', 'barrel', 'bell', 'compass'],
    items: [
      {
        id: 'track',
        text: 'You start with 1 gold; the limit is 5 and extra gold is lost.',
        source: { book: 'rules', pages: '5, 12, 18' },
      },
      {
        id: 'buy',
        text: 'In phase A or B, spend gold on a card from the bonus cards supply: steering wheel or barrel 3 gold, bell 4 gold, compass 5 gold. It goes on your discard pile.',
        source: { book: 'rules', pages: '18' },
      },
      {
        id: 'gain',
        text: 'Gold also comes from placing a new private building (not replacing one), a sailor row space, some bonus tiles and pathfinder spaces 3 and 8.',
        source: { book: 'rules', pages: '17, 18' },
      },
      {
        id: 'joker',
        text: 'A joker worker always costs 1 gold on top.',
        source: { book: 'rules', pages: '13' },
      },
    ],
  },
  {
    id: 'hire',
    title: 'Hire a worker',
    category: 'Workers',
    tags: ['worker', 'job market', 'hire', 'immediate action'],
    items: [
      {
        id: 'cost',
        text: 'Take one worker from the job market and pay the cost shown at the right of its row, changed by the number on the action icon.',
        source: { book: 'rules', pages: '13' },
      },
      {
        id: 'place',
        text: 'Place it on the leftmost free space of its row. If that space shows an immediate action, do it now or forfeit it. A full row cannot take another worker.',
        source: { book: 'rules', pages: '13' },
      },
      {
        id: 'vp',
        text: 'Each worker on the fifth space of a row is worth 4 VP at the end.',
        source: { book: 'rules', pages: '13, 19' },
      },
    ],
  },
  {
    id: 'workers',
    title: 'Worker types',
    category: 'Workers',
    tags: ['shepherd', 'craftsman', 'sailor', 'shearer', 'joker'],
    items: [
      {
        id: 'start',
        text: 'Everyone starts with one shepherd, craftsman, sailor and shearer printed on the board.',
        source: { book: 'rules', pages: '13' },
      },
      {
        id: 'shepherd',
        text: 'Shepherds decide which sheep purchases you can make.',
        source: { book: 'rules', pages: '14' },
      },
      {
        id: 'craftsman',
        text: 'Craftsmen decide which private buildings you can place.',
        source: { book: 'rules', pages: '14' },
      },
      {
        id: 'sailor',
        text: 'Sailors are how far the ship action moves your ship.',
        source: { book: 'rules', pages: '15' },
      },
      {
        id: 'shearer',
        text: 'Shearers are how many sheep types you can show when shearing; an unused one lets you draw 1 and discard 1.',
        source: { book: 'rules', pages: '16' },
      },
      {
        id: 'joker',
        text: 'A joker worker (bonus tile) goes in any row and can become a harbourmaster.',
        source: { book: 'rules', pages: '13, 15' },
      },
    ],
  },
  {
    id: 'invest',
    title: 'Invest in a bonus tile',
    category: 'Actions',
    tags: ['bonus tile', 'invest', 'market'],
    items: [
      {
        id: 'row',
        text: 'Not from the row where the market token is: those tiles wait until it moves on.',
        source: { book: 'rules', pages: '13' },
      },
      {
        id: 'cost',
        text: 'Pay the cost at the right of the tile’s row, changed by the number on the action icon, plus any extra cost on the tile. Take its reward and put it next to your board.',
        source: { book: 'rules', pages: '13' },
      },
      {
        id: 'all',
        text: 'Meet all requirements and take all rewards, cards included, unless that supply is empty. VP in the upper right corner score at the end.',
        source: { book: 'appendix', pages: '4' },
      },
    ],
  },
  {
    id: 'build',
    title: 'Place a private building',
    category: 'Actions',
    tags: ['build', 'craftsman', 'replace', 'building'],
    items: [
      {
        id: 'need',
        text: 'You need at least as many craftsmen as the number in the tile’s upper left corner and must pay 2 pounds per craftsman needed.',
        source: { book: 'rules', pages: '14' },
      },
      {
        id: 'where',
        text: 'Place it on any empty building space. Four spaces also need your pathfinder disc on 2, 4 or 7 as shown on them.',
        source: { book: 'rules', pages: '14' },
      },
      {
        id: 'replace',
        text: 'Or replace one of your buildings with a higher one: you need only the difference in craftsmen and pay only the difference. The old tile leaves the game. Buildings over 5 craftsmen can only be placed this way.',
        source: { book: 'rules', pages: '14' },
      },
      {
        id: 'gold',
        text: 'A new building (not a replacement) moves your gold marker 1 space.',
        source: { book: 'rules', pages: '18' },
      },
      {
        id: 'other-ways',
        text: 'Besides this action: a craftsman row immediate action (1 pound per craftsman) and the Set 6 bonus card (replace with a tile exactly 1 craftsman higher).',
        source: { book: 'rules', pages: '14' },
      },
    ],
  },
  {
    id: 'buy-sheep',
    title: 'Buy sheep',
    category: 'Actions',
    tags: ['sheep', 'market', 'shepherd', 'buy'],
    items: [
      {
        id: 'options',
        text: 'Your shepherds decide the options; split them as you like, each used once (see the table in Tools). Bought cards go face up on your discard pile.',
        source: { book: 'rules', pages: '14' },
      },
      {
        id: 'unused',
        text: 'An unused shepherd may add 2 cards from the market stack to the market, at any moment during the action.',
        source: { book: 'rules', pages: '14' },
      },
    ],
  },
  {
    id: 'shear',
    title: 'Shear your sheep',
    category: 'Actions',
    tags: ['wool', 'shear', 'shearer', 'wool trading post'],
    items: [
      {
        id: 'show',
        text: 'Show up to as many different sheep types as you have shearers. Add their wool values and your permanent wool; take that many pounds and discard the shown cards.',
        source: { book: 'rules', pages: '16' },
      },
      {
        id: 'post',
        text: 'Then you may put a disc on a wool trading post with value up to that total and without your disc yet (post 13 takes any number). Local wool posts are 5, 9 and 13.',
        source: { book: 'rules', pages: '16' },
      },
      {
        id: 'romney',
        text: 'Each dark-cornered wool trading post space gives you a Romney.',
        source: { book: 'rules', pages: '16' },
      },
    ],
  },
  {
    id: 'hazards',
    title: 'Hazards',
    category: 'Board',
    tags: ['hazard', 'flood', 'rockfall', 'sheepdog', 'ferry', 'fee'],
    items: [
      {
        id: 'kinds',
        text: '16 hazard tiles: 9 rockfalls and 7 floods.',
        source: { book: 'rules', pages: '2' },
      },
      {
        id: 'fee',
        text: 'A hand on a hazard is a fee to the bank when you enter or pass it; without money you pay what you can and go on.',
        source: { book: 'rules', pages: '7' },
      },
      {
        id: 'remove',
        text: 'Remove a hazard takes a tile of your choice from either section, paying the cost on the action icon if it shows one. Keep it face up (2, 3 or 4 VP) and take a Sheepdog for a rockfall or a Ferry for a flood.',
        source: { book: 'rules', pages: '18' },
      },
      {
        id: 'runholders',
        text: 'Runholders on a removed hazard stay on the empty space and move on from there.',
        source: { book: 'rules', pages: '20' },
      },
    ],
  },
  {
    id: 'pathfinder',
    title: 'Pathfinder track',
    category: 'Board',
    tags: ['pathfinder', 'step tile', 'fee tile', 'gold'],
    items: [
      {
        id: 'rewards',
        text: 'Reaching or passing space 3 or 8: 1 gold. Space 4 or 6 (by player count): an orange step tile, step limit +1. Spaces 2, 4 and 7 open building spaces.',
        source: { book: 'rules', pages: '17' },
      },
      {
        id: 'eleven',
        text: 'At space 11 choose: turn your step tile to +2, or turn your fee tile so you never pay hand fees again.',
        source: { book: 'rules', pages: '17' },
      },
      {
        id: 'end',
        text: 'At the end you score the highest VP value reached, at most 15. Beyond space 16 each further step pays 1 pound. The disc never moves back.',
        source: { book: 'rules', pages: '17' },
      },
    ],
  },
  {
    id: 'objectives',
    title: 'Objective cards',
    category: 'Cards',
    tags: ['objective', 'task', 'vp'],
    items: [
      {
        id: 'gain',
        text: 'Take one from the general display (refill it) or the top of the stack, onto your discard pile. Bonus objective cards on the bonus cards supply cannot be taken this way.',
        source: { book: 'rules', pages: '17' },
      },
      {
        id: 'play',
        text: 'Play from your hand before phase A or before or after a single action in phase B: it goes to your objective area and you do its immediate action or forfeit it.',
        source: { book: 'rules', pages: '17' },
      },
      {
        id: 'score',
        text: 'At the end, fully met cards give their VP; others cost their penalty.',
        source: { book: 'rules', pages: '17' },
      },
    ],
  },
  {
    id: 'auxiliary',
    title: 'Auxiliary actions',
    category: 'Actions',
    tags: ['auxiliary', 'single', 'double', 'disc'],
    items: [
      {
        id: 'unlock',
        text: 'Five auxiliary actions, each with 2 disc spaces. At the start 2 are open; each other one opens once one of its discs is cleared.',
        source: { book: 'rules', pages: '8, 18' },
      },
      {
        id: 'double',
        text: 'With both discs cleared, an action icon that allows it lets you double it (cost and reward). A single auxiliary action taken instead of local actions is never doubled.',
        source: { book: 'rules', pages: '18' },
      },
      {
        id: 'list',
        text: 'Single / double: draw 1 discard 1 / draw 2 discard 2; pay 2 for 1 certificate / pay 4 for up to 2; pay 1 for 1 pathfinder step / pay 2 for 2; pay 1 to move the ship 1 / pay 2 to move it up to 2; gain 1 pound / gain 2.',
        source: { book: 'rules', pages: '18' },
      },
    ],
  },
  {
    id: 'disc-spaces',
    title: 'Disc spaces on your player board',
    category: 'Board',
    tags: ['disc', 'white corners', 'dark corners', 'player board', 'permanent wool'],
    items: [
      {
        id: 'corners',
        text: 'A disc from a white-cornered space can go on any trading post or harbour space; one from a dark-cornered space only on a dark-cornered one. With only dark discs left you may use them on white spaces.',
        source: { book: 'rules', pages: '9, 20' },
      },
      {
        id: 'abilities',
        text: 'Clearing a space unlocks it: auxiliary actions, step limit (gain 3 pounds), hand limit (pay 3 or 8 pounds), certificate limit 5, permanent certificates (left one costs 4 pounds), permanent wool (right one costs 4 pounds).',
        source: { book: 'rules', pages: '9' },
      },
      {
        id: 'none-left',
        text: 'If you must place a disc but cannot, take one of yours from a medium harbour; with none there, place nothing.',
        source: { book: 'rules', pages: '20' },
      },
    ],
  },
  {
    id: 'move-forward',
    title: 'Move your runholder forward',
    category: 'Actions',
    tags: ['runholder', 'move', 'phase b'],
    items: [
      {
        id: 'move',
        text: 'Move at least 1 and at most the white number of steps, then do all of phase B again where you stop. Your hand is not refilled until phase C.',
        source: { book: 'rules', pages: '18' },
      },
    ],
  },
  {
    id: 'deck',
    title: 'Your deck',
    category: 'Cards',
    tags: ['deck', 'draw stack', 'discard pile', 'shuffle'],
    items: [
      {
        id: 'parts',
        text: 'Your flock deck is your draw stack, your hand and your discard pile. Gained cards go on the discard pile unless an action says otherwise.',
        source: { book: 'rules', pages: '6' },
      },
      {
        id: 'reshuffle',
        text: 'Only when you must draw from an empty stack do you shuffle your discard pile into a new stack.',
        source: { book: 'rules', pages: '6' },
      },
      {
        id: 'look',
        text: 'You may look through your discard pile at any time, never through your draw stack.',
        source: { book: 'rules', pages: '20' },
      },
      {
        id: 'stack',
        text: 'Deck-building and bonus cards cannot be combined to stack their effects; you may play one just to draw a card.',
        source: { book: 'appendix', pages: '4' },
      },
    ],
  },
  {
    id: 'end',
    title: 'End of the game',
    category: 'Game end',
    tags: ['end', 'last turn', 'market token', 'tie'],
    items: [
      {
        id: 'trigger',
        text: 'Placing a bonus tile on the last space of the bonus tiles market during Foresight B moves the market token out along the red arrow: that player takes it (5 VP) and this was their last turn.',
        source: { book: 'rules', pages: '19' },
      },
      {
        id: 'others',
        text: 'Every other player has one final turn without phase C.',
        source: { book: 'rules', pages: '19' },
      },
      {
        id: 'tie',
        text: 'Most VP wins; a tie is a shared victory.',
        source: { book: 'rules', pages: '19' },
      },
    ],
  },
  {
    id: 'supply',
    title: 'Running out',
    category: 'Game end',
    tags: ['bank', 'supply', 'empty'],
    items: [
      {
        id: 'bank',
        text: 'Money and exchange tokens are unlimited; use a substitute if needed.',
        source: { book: 'rules', pages: '20' },
      },
      {
        id: 'stacks',
        text: 'An empty objective stack, deck-building stack or bonus card supply is not refilled.',
        source: { book: 'rules', pages: '20' },
      },
    ],
  },
];
