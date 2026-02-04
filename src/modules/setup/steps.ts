export type SetupStepType = 'text' | 'interactive';

export interface SetupStep {
  id: string;
  title: string;
  content: string;
  type: SetupStepType;
}

export const setupSteps: SetupStep[] = [
  {
    id: 'board',
    title: 'Global Board Setup',
    content:
      '1. Place the Sea Routes Board above the Game Board.\n2. Randomly place 5 Harbourmaster Tiles on the Sea Board.\n3. Shuffle the Neutral Buildings and place 8 of them face up on the designated spaces.\n4. Sort the distinct Sheep Cards into the Market.',
    type: 'text',
  },
  {
    id: 'buildings',
    title: 'Neutral Buildings',
    content:
      'Randomize which side (A/B) of each neutral building is active for this game. Use the toggles below to match the physical board state.',
    type: 'interactive',
  },
  {
    id: 'tokens',
    title: 'Token & Market Setup',
    content:
      'Bag A (Workers):\n• 2 Players: Fill columns 1 and 2 only.\n• 3 Players: Fill columns 1, 2, and 3.\n• 4 Players: Fill all columns.\n\nPlace Hazards in ascending order (lowest cost first).\n\nBag B (Bonus Tiles):\nFill the top 2 rows of the Bonus Market randomly.',
    type: 'text',
  },
  {
    id: 'players',
    title: 'Player Setup',
    content:
      'Each player takes: Player Board, Herder, Hat, 15 Discs, and a Ship.\n\nStarting Deck (14 Cards total):\n• 4x Romney\n• 3x Lincoln\n• 3x Perendale\n• 4x Starting Cards\n\nShuffle your deck and draw 4 cards. Place your Ship on the Start space (Baileys Beach).',
    type: 'text',
  },
  {
    id: 'resources',
    title: 'Starting Resources',
    content:
      'Determine the start player randomly. Assign starting Coins and Bonus Cards based on turn order below.',
    type: 'interactive',
  },
];
