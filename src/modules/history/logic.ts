import type { ArchivedGame } from '../../types';

const STORAGE_KEY = 'gwt-nz-archive';

export function archiveGame(game: Omit<ArchivedGame, 'id' | 'date'>): void {
  const archivedGames = getArchivedGames();
  const newGame: ArchivedGame = {
    ...game,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  archivedGames.push(newGame);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(archivedGames));
}

export function getArchivedGames(): ArchivedGame[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const games = JSON.parse(stored) as ArchivedGame[];
    return games.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export function deleteArchivedGame(id: string): void {
  const archivedGames = getArchivedGames();
  const filtered = archivedGames.filter((game) => game.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function getWinners(game: ArchivedGame): number[] {
  if (game.leaderboard.length === 0) return [];
  const topScore = game.leaderboard[0].total;
  return game.leaderboard.filter((entry) => entry.total === topScore).map((entry) => entry.player);
}
