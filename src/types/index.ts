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
