# Task: Game History & Archive

**Goal**: Implement a system to save and view historical game results.

## Context
Users want to track their progress over multiple sessions. Currently, the app only persists the *active* session. This task adds a historical archive to record finished games, including final scores and game setup.

## Rules of Engagement
- **Persistence**: Use `localStorage` with namespaced keys (`gwt-nz-archive`).
- **UX**: The archiving process should be explicit (user clicks "Archive Session").
- **KISS**: Start with a simple list view for historical entries.

## Files to touch
- `src/types/index.ts`
- `src/App.tsx`
- `src/modules/scoring/ScoringPage.tsx`
- `src/modules/history/HistoryPage.tsx` (New file)
- `src/modules/history/logic.ts` (New file)

## Instructions

1.  **Types**: Add `ArchivedGame` interface to `src/types/index.ts`. It must include: `id`, `date` (ISO string), `playerCount`, `leaderboard` (PlayerScore[]), and optionally `setup` (ActiveBuilding[]).
2.  **Logic**: Create `src/modules/history/logic.ts`.
    - Implement `archiveGame(game: Omit<ArchivedGame, 'id' | 'date'>): void`.
    - Implement `getArchivedGames(): ArchivedGame[]`.
    - Implement `deleteArchivedGame(id: string): void`.
3.  **Scoring Integration**:
    - In `ScoringPage.tsx`, add an "Archive Session" button near "Clear All".
    - When clicked, it should gather current `sheets`, `playerCount`, and `leaderboard`, and call `archiveGame`.
    - After archiving, optionally clear the current scoring state or show a success message.
4.  **History Page**: Create `src/modules/history/HistoryPage.tsx`.
    - Render a list of archived games.
    - Each entry should show the date, player count, and the winner's score.
    - Include a "Delete" button for each entry.
5.  **Navigation**:
    - Add a new "History" module to the `modules` array in `App.tsx` (using the `History` icon from `lucide-react`).
    - Add the corresponding `<Route>` for `/history`.

## Acceptance Criteria
- [ ] "Archive Session" button correctly saves data to localStorage.
- [ ] History page displays all saved games in reverse chronological order.
- [ ] Winners are clearly identified in the history list.
- [ ] Users can delete individual history entries.
- [ ] State persists across page refreshes.
