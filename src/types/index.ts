export type BuildingType = 'neutral' | 'private';
export type ActionType = 'auxiliary' | 'local' | 'delivery' | 'passive';

export interface BuildingAction {
  description: string;
  cost?: string;
  type: ActionType;
}

export interface BuildingSide {
  id: string;
  side: 'a' | 'b';
  actions: BuildingAction[];
  rulebook_ref?: number;
}

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  sides: {
    a: BuildingSide;
    b: BuildingSide;
  };
}

export interface ScoreSheet {
  coins: number;
  buildings: number;
  citiesPorts: number;
  unlockedDiscs: number;
  hazards: number;
  sheepCards: number;
  objectiveCards: number;
  birdCards: number;
  bonusTiles: number;
  harbourmasterTiles: number;
  remainingMoney: number;
}

// Sea Routes Board Types
export interface Port {
  id: string;
  name: string;
  cost: number; // Ship movement points to reach this port
  bonus: string; // Description of bonus for placing a disc
}

export interface SeaBoardState {
  playerShips: Record<number, string>; // player number -> port ID
  claimedPorts: Record<string, number[]>; // port ID -> array of player numbers who placed discs
}
