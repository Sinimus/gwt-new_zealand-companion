import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { PLAYER_COUNTS, type PlayerCount } from '../../data/rules/types';

// The player count lives in the URL (?players=1..4), never in storage: the app keeps no game state.
export function usePlayerCount(): [PlayerCount, (count: PlayerCount) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsed = Number.parseInt(searchParams.get('players') ?? '', 10);
  const count = PLAYER_COUNTS.find((candidate) => candidate === parsed) ?? 4;

  const setCount = useCallback(
    (next: PlayerCount) => {
      setSearchParams(
        (previous) => {
          const params = new URLSearchParams(previous);
          params.set('players', String(next));
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return [count, setCount];
}
