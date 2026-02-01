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
    title: 'Global Board',
    content:
      'Place Sea Routes Board above Game Board. Randomly place 5 Harbourmaster Tiles. Place 8 Neutral Buildings (face up).',
    type: 'text',
  },
  {
    id: 'buildings',
    title: 'Neutral Buildings',
    content: 'Randomize which side of each neutral building is active.',
    type: 'interactive',
  },
  {
    id: 'tokens',
    title: 'Token Setup',
    content:
      'Bag A (Workers): Fill Job Market columns based on player count. Place Hazards in ascending order. Bag B (Bonus): Fill top 2 rows of Bonus Market.',
    type: 'text',
  },
  {
    id: 'players',
    title: 'Player Setup',
    content:
      'Each player takes: Board, Herder, Hat, 15 Discs, Ship. Shuffle Starting Deck (4 types). Place Ship on Start.',
    type: 'text',
  },
  {
    id: 'resources',
    title: 'Starting Resources',
    content: 'Assign starting money and cards by player order.',
    type: 'interactive',
  },
];
