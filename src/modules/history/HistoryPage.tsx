import { Trash2, Trophy, Calendar, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getArchivedGames, deleteArchivedGame, formatDate, getWinners } from './logic';
import type { ArchivedGame } from '../../types';

export default function HistoryPage() {
  const [games, setGames] = useState<ArchivedGame[]>([]);

  useEffect(() => {
    const loadGames = () => setGames(getArchivedGames());
    loadGames();
    window.addEventListener('focus', loadGames);
    return () => window.removeEventListener('focus', loadGames);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this game from history?')) {
      deleteArchivedGame(id);
      setGames(getArchivedGames());
    }
  };

  return (
    <main className="min-h-screen bg-canvas text-text">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-text/60">History Module</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Game Archive</h1>
          <p className="max-w-2xl text-sm text-text/70">
            View your historical game results. Winners are highlighted with the trophy icon.
          </p>
        </header>

        {games.length === 0 ? (
          <section className="rounded-2xl border border-primary/20 bg-white/80 p-12 text-center">
            <Trophy className="mx-auto h-12 w-12 text-text/30" />
            <h2 className="mt-4 text-xl font-semibold text-text">No games archived yet</h2>
            <p className="mt-2 text-sm text-text/60">
              Complete a game in the Scoring module and click &quot;Archive Session&quot; to save it here.
            </p>
          </section>
        ) : (
          <section className="space-y-4">
            {games.map((game) => {
              const winners = getWinners(game);
              return (
                <div key={game.id} className="rounded-2xl border border-primary/20 bg-white/80 p-5 transition hover:border-primary/40">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-text/60">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <time>{formatDate(game.date)}</time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{game.playerCount} Players</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {game.leaderboard.map((entry) => {
                          const isWinner = winners.includes(entry.player);
                          return (
                            <div key={entry.player} className={`flex items-center gap-2 rounded-full border px-3 py-1 ${
                              isWinner ? 'border-primary bg-primary/20 text-primary' : 'border-primary/20 bg-white/70 text-text/80'
                            }`}>
                              {isWinner ? <Trophy className="h-4 w-4" /> : null}
                              <span className="font-semibold">P{entry.player}</span>
                              <span className="text-sm">{entry.total} VP</span>
                              {entry.remainingMoney > 0 ? <span className="text-xs uppercase text-text/60">£{entry.remainingMoney}</span> : null}
                            </div>
                          );
                        })}
                      </div>
                      {winners.length > 0 && (
                        <p className="text-sm font-semibold text-primary">
                          {winners.length === 1 ? <>Player {winners[0]} wins!</> : <>Players {winners.join(' & ')} tied!</>}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(game.id)}
                      className="rounded-full border border-red-400/30 bg-red-50/50 p-2 text-red-600 transition hover:border-red-400 hover:bg-red-50"
                      title="Delete this game"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
