# Task: Advanced Tie-Breakers

**Goal**: Implement official tie-breaking rules in the Scoring module and enhance the leaderboard UI.

## Context
Currently, the leaderboard only sorts by total Victory Points. In competitive Great Western Trail: New Zealand sessions, ties are common. Official rules resolve ties by comparing the remaining money of tied players.

## Rules of Engagement
- **Standard Protocol**: Update types, logic, and UI while maintaining persistence.
- **TDD**: You MUST add/update tests in `src/modules/scoring/logic.test.ts` to cover tie-breaker scenarios.
- **KISS**: Do not overcomplicate the UI. A simple "Broken by Money" indicator is sufficient.

## Files to touch
- `src/types/index.ts`
- `src/modules/scoring/logic.ts`
- `src/modules/scoring/logic.test.ts`
- `src/modules/scoring/ScoringPage.tsx`

## Instructions

1.  **Type Definition**: Update `ScoreSheet` in `src/types/index.ts` to include `remainingMoney: number`.
2.  **Scoring Logic**:
    - Enhance `PlayerScore` type in `logic.ts` to include `remainingMoney`.
    - Update `buildLeaderboard` to sort by `total` (DESC), then `remainingMoney` (DESC).
3.  **UI Implementation**:
    - In `ScoringPage.tsx`, add a new `FieldConfig` for "Remaining Money". Place it in the "Board Assets" section or a new dedicated section.
    - Update `LeaderboardSummary` to visually distinguish the winner even in case of equal total VPs.
4.  **Persistence**: Update the `sheets` initialization and persistence logic to handle the new `remainingMoney` field.
5.  **Verification**: 
    - Add a test case in `logic.test.ts` where two players have 100 VP, but one has £5 and the other has £2.
    - Run `pnpm lint` and `pnpm build`.

## Acceptance Criteria
- [ ] `pnpm lint` and `pnpm build` pass.
- [ ] Leaderboard correctly ranks players with tied VPs.
- [ ] "Remaining Money" is persisted across refreshes.
- [ ] New unit tests pass.
