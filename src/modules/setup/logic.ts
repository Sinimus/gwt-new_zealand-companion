import type { Building, BuildingSide, ActiveBuilding, PlayerCount } from '../../types';
export type { ActiveBuilding, PlayerCount };
import { buildings } from '../../lib/data';

export type StartingResource = {
  player: number;
  money: number;
  cards: number;
};

export function randomizeBuildings(): ActiveBuilding[] {
  return buildings.map((building) => {
    const side = Math.random() < 0.5 ? 'a' : 'b';
    return {
      ...building,
      activeSide: building.sides[side],
    };
  });
}

export function getStartingResources(count: PlayerCount): StartingResource[] {
  const all: StartingResource[] = [
    { player: 1, money: 7, cards: 4 },
    { player: 2, money: 8, cards: 5 },
    { player: 3, money: 9, cards: 6 },
    { player: 4, money: 10, cards: 7 },
  ];

  return all.slice(0, count);
}

export function getMarketSetupNote(count: PlayerCount): string {
  if (count === 2) {
    return 'Use only first 2 columns of Bonus Tile Market.';
  }
  if (count === 3) {
    return 'Use first 3 columns of Bonus Tile Market.';
  }
  return 'Use all 4 columns of Bonus Tile Market.';
}
