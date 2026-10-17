import type { RuleSection } from './types';

// Static reference of the sea routes board (ruling r169, Rulebook p. 15-16). No tracker: where the
// ships are lives on the board.

export const SEA_ROUTES: readonly RuleSection[] = [
  {
    id: 'move',
    title: 'Moving your ship',
    items: [
      {
        id: 'sailors',
        text: 'The ship action moves your ship up to as many spaces as you have sailors, in any direction. Other actions name their own number; the same rules apply.',
        source: { book: 'rules', pages: '15' },
      },
      {
        id: 'spaces',
        text: 'Any number of ships share a space, and occupied spaces count like any other.',
        source: { book: 'rules', pages: '15' },
      },
      {
        id: 'stop',
        text: 'You may move fewer spaces, but movement left over when you stop is lost.',
        source: { book: 'rules', pages: '15' },
      },
    ],
  },
  {
    id: 'upgrade',
    title: 'Upgrading a harbour',
    items: [
      {
        id: 'when',
        text: 'Standing on (or reaching) a water space with a harbour connection and with at least 1 movement left, spend 1 movement to upgrade it: place a storehouse or a disc and pay the shown cost. This ends the move action.',
        source: { book: 'rules', pages: '15' },
      },
      {
        id: 'once',
        text: 'Each harbour once per player: not if your storehouse or disc is already there. Opponents’ pieces do not matter. With no storehouses or discs left on your board, you cannot upgrade that kind of harbour.',
        source: { book: 'rules', pages: '15' },
      },
    ],
  },
  {
    id: 'small',
    title: 'Small harbour',
    items: [
      {
        id: 'storehouse',
        text: 'Pay the cost on a storehouse space, place a storehouse from your board and take the card shown on the harbour (if any are left).',
        source: { book: 'rules', pages: '15' },
      },
      {
        id: 'bonus',
        text: 'When both storehouses linked to a bonus on your player board are placed, take that immediate bonus or forfeit it; a permanent bonus simply applies from now on.',
        source: { book: 'rules', pages: '15' },
      },
      {
        id: 'route-end',
        text: 'The small harbour at the very end of each of the 3 routes: after upgrading it, take a compass bonus card and reset your ship to the starting space.',
        source: { book: 'rules', pages: '16' },
      },
      {
        id: 'yellow-arrows',
        text: 'The 4 VP on a yellow arrow in the upper left score only if both small harbours next to it hold your storehouse.',
        source: { book: 'rules', pages: '16' },
      },
    ],
  },
  {
    id: 'medium',
    title: 'Medium harbour',
    items: [
      {
        id: 'disc',
        text: 'Pay the cost above the disc space and put a disc from your board there (white-cornered discs fit any space, dark-cornered ones only dark spaces). Take the card shown on the harbour.',
        source: { book: 'rules', pages: '15' },
      },
      {
        id: 'harbourmaster',
        text: 'If its harbourmaster tile is still there, you may take it now by moving one of your hired workers from the rightmost occupied space of its row onto the harbourmaster space, for good. Later you cannot take it.',
        source: { book: 'rules', pages: '15' },
      },
      {
        id: 'tile',
        text: 'Upper half of the tile: an immediate action (do it now or forfeit it) or a permanent certificate. Lower half: a task that gives VP at the end.',
        source: { book: 'rules', pages: '15, 19' },
      },
      {
        id: 'uncovered',
        text: 'A worker space uncovered this way gives its immediate action again to the next worker you place there.',
        source: { book: 'rules', pages: '15' },
      },
    ],
  },
  {
    id: 'large',
    title: 'Large harbour',
    items: [
      {
        id: 'storehouse',
        text: 'Like a small harbour but free: place a storehouse on one of its four spaces and check your player board for an unlocked bonus.',
        source: { book: 'rules', pages: '16' },
      },
      {
        id: 'foreign',
        text: 'Your storehouse there opens its foreign trading post for your later deliveries (one disc per player, transport costs as usual). A foreign wool trading post takes discs only when you shear your sheep. You never have to deliver there.',
        source: { book: 'rules', pages: '16' },
      },
    ],
  },
  {
    id: 'scoring',
    title: 'At the end',
    items: [
      {
        id: 'harbours',
        text: 'VP unlocked by your discs and storehouses on small and medium harbours count in scoring category 4.',
        source: { book: 'rules', pages: '19' },
      },
    ],
  },
];
