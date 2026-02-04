import { Anchor, MapPin, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Port, SeaBoardState } from '../../../types';

// Static list of ports based on GWT:NZ game board
// Ordered roughly geographically north to south along the east coast
const PORTS: Port[] = [
  { id: 'picton', name: 'Picton', cost: 2, bonus: 'Place disc: +2 VP' },
  { id: 'wellington', name: 'Wellington', cost: 0, bonus: 'Place disc: +3 VP' },
  { id: 'napier', name: 'Napier', cost: 3, bonus: 'Place disc: Draw 2 cards' },
  { id: 'gisborne', name: 'Gisborne', cost: 4, bonus: 'Place disc: +4 VP' },
  { id: 'tauranga', name: 'Tauranga', cost: 3, bonus: 'Place disc: Delivery bonus' },
  { id: 'auckland', name: 'Auckland', cost: 3, bonus: 'Place disc: +5 VP' },
  { id: 'new-plymouth', name: 'New Plymouth', cost: 3, bonus: 'Place disc: Hazards -2' },
  { id: 'whanganui', name: 'Whanganui', cost: 2, bonus: 'Place disc: +3 VP' },
  { id: 'palmerston', name: 'Palmerston N.', cost: 3, bonus: 'Place disc: Unlock 2 discs' },
  { id: 'nelson', name: 'Nelson', cost: 2, bonus: 'Place disc: +2 VP' },
  { id: 'greymouth', name: 'Greymouth', cost: 3, bonus: 'Place disc: Coal VP' },
  { id: 'christchurch', name: 'Christchurch', cost: 2, bonus: 'Place disc: +4 VP' },
  { id: 'timaru', name: 'Timaru', cost: 2, bonus: 'Place disc: +2 VP' },
  { id: 'oamaru', name: 'Oamaru', cost: 2, bonus: 'Place disc: +2 VP' },
  { id: 'dunedin', name: 'Dunedin', cost: 3, bonus: 'Place disc: +5 VP' },
  { id: 'invercargill', name: 'Invercargill', cost: 3, bonus: 'Place disc: +3 VP' },
];

const STORAGE_KEY = 'gwt-nz-sea-state';

const defaultState: SeaBoardState = {
  playerShips: { 1: 'wellington', 2: 'wellington', 3: 'wellington', 4: 'wellington' },
  claimedPorts: {},
};

export default function SeaRoutesBoard() {
  const [playerCount, setPlayerCount] = useState<number>(4);
  const [state, setState] = useState<SeaBoardState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultState;
      }
    }
    return defaultState;
  });

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setPlayerShip = (player: number, portId: string) => {
    setState((prev: SeaBoardState) => ({
      ...prev,
      playerShips: { ...prev.playerShips, [player]: portId },
    }));
  };

  const toggleDisc = (portId: string, player: number) => {
    setState((prev: SeaBoardState) => {
      const claimed = { ...prev.claimedPorts };
      const portClaims = claimed[portId] || [];

      if (portClaims.includes(player)) {
        // Remove disc
        claimed[portId] = portClaims.filter((p: number) => p !== player);
        if (claimed[portId].length === 0) {
          delete claimed[portId];
        }
      } else {
        // Add disc
        claimed[portId] = [...portClaims, player].sort((a, b) => a - b);
      }

      return { ...prev, claimedPorts: claimed };
    });
  };

  const resetBoard = () => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  const activePlayers = Array.from({ length: playerCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-white/80 p-4">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-text/60">Players</span>
          {[2, 3, 4].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setPlayerCount(count)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                playerCount === count
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-primary/30 bg-white/60 text-text/70 hover:border-primary'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={resetBoard}
          className="rounded-full border border-primary/30 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text/80 transition hover:border-primary hover:bg-white"
        >
          Reset Board
        </button>
      </section>

      {/* Player Ship Positions */}
      <section className="rounded-2xl border border-primary/20 bg-white/80 p-5">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-text">
          <Anchor className="h-5 w-5 text-primary" />
          Ship Positions
        </h2>
        <div className="space-y-3">
          {activePlayers.map((player) => {
            const currentPortId = state.playerShips[player] || 'wellington';
            return (
              <div key={player} className="flex items-center gap-4">
                <span className="w-20 text-sm font-semibold text-text">P{player}</span>
                <select
                  value={currentPortId}
                  onChange={(e) => setPlayerShip(player, e.target.value)}
                  className="flex-1 rounded-xl border border-primary/30 bg-white px-4 py-2 text-sm text-text outline-none transition focus:border-primary"
                >
                  {PORTS.map((port) => (
                    <option key={port.id} value={port.id}>
                      {port.name} ({port.cost} moves)
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ports List with Disc Tracking */}
      <section className="rounded-2xl border border-primary/20 bg-white/80 p-5">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-text">
          <MapPin className="h-5 w-5 text-primary" />
          Ports & Discs
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PORTS.map((port) => {
            const claimed = state.claimedPorts[port.id] || [];
            const hasShip = activePlayers.some((p) => state.playerShips[p] === port.id);

            return (
              <div
                key={port.id}
                className={`relative rounded-xl border p-4 transition ${
                  hasShip ? 'border-primary/50 bg-primary/5' : 'border-primary/20 bg-white/60'
                }`}
              >
                {/* Ship indicator */}
                {hasShip && (
                  <div className="absolute right-2 top-2 flex gap-1">
                    {activePlayers
                      .filter((p) => state.playerShips[p] === port.id)
                      .map((p) => (
                        <div
                          key={p}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white"
                        >
                          {p}
                        </div>
                      ))}
                  </div>
                )}

                <h3 className="pr-16 text-base font-semibold text-text">{port.name}</h3>
                <p className="mt-1 text-xs text-text/60">
                  Cost: <span className="font-semibold">{port.cost} moves</span>
                </p>
                <p className="mt-1 text-xs text-text/70">{port.bonus}</p>

                {/* Disc toggles */}
                <div className="mt-3 flex gap-2">
                  {activePlayers.map((player) => {
                    const hasDisc = claimed.includes(player);
                    return (
                      <button
                        key={player}
                        type="button"
                        onClick={() => toggleDisc(port.id, player)}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition ${
                          hasDisc
                            ? 'border-primary bg-primary text-white'
                            : 'border-primary/30 bg-white/60 text-text/50 hover:border-primary'
                        }`}
                        title={`P${player} ${hasDisc ? 'remove' : 'place'} disc`}
                      >
                        <Shield className="h-4 w-4" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Legend */}
      <section className="rounded-2xl border border-primary/20 bg-white/60 p-4 text-xs text-text/70">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              1
            </div>
            <span>Ship at port</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span>Disc placed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-white/60">
              <Shield className="h-4 w-4 text-text/50" />
            </div>
            <span>No disc</span>
          </div>
        </div>
      </section>
    </div>
  );
}
