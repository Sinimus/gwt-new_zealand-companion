# Task: Compliance & Persistence

**Goal**: Fix ESLint configuration, implement state persistence for Scoring and Setup modules, and update the README to comply with Gotrek Standard.

## Context
The companion app currently loses all user data (scoring, setup) on page reload, which is a major UX friction point for a board game tool. Additionally, the linting configuration is broken, and the `README.md` is missing the required protocol sections.

## Rules of Engagement
- **KISS Principle**: Implement state persistence using `localStorage`. Use simple `useEffect` hooks or a lightweight custom hook. Do NOT add new state management libraries.
- **Protocol Compliance**: Strictly follow `AGENTS.md` regarding documentation and tools (`pnpm`).
- **Strictness**: Ensure `pnpm lint` and `pnpm build` pass with zero errors/warnings.

## Files to touch
- `.eslintrc.cjs`
- `src/modules/scoring/ScoringPage.tsx`
- `src/modules/setup/SetupPage.tsx`
- `src/modules/setup/components/SetupWizard.tsx`
- `README.md`

## Instructions

1.  **Fix ESLint**: Resolve the "Unexpected top-level property 'name'" error in `.eslintrc.cjs` (caused by an incompatibility in the `react-refresh` plugin configuration).
2.  **Scoring Persistence**: 
    - In `ScoringPage.tsx`, persist `sheets`, `playerCount`, and `activePlayer` to `localStorage`.
    - Ensure the "Clear All" button also clears the storage.
3.  **Setup Persistence**:
    - In `SetupPage.tsx`, persist the `setup` (buildings) and `playerCount`.
    - In `SetupWizard.tsx`, persist the `currentStepIndex`.
4.  **Update README**:
    - Add a `## Dev Log` section summarizing the ESLint fix and persistence implementation.
    - Add a `## Roadmap` section with: "Advanced tie-breakers", "Interactive Sea Routes Board", "Game history/Archive".

## Acceptance Criteria
- [ ] `pnpm lint` passes with 0 errors.
- [ ] `pnpm build` completes successfully.
- [ ] Scoring inputs survive a page refresh.
- [ ] Randomized buildings and the current step in Setup wizard survive a page refresh.
- [ ] `README.md` contains the `Dev Log` and `Roadmap` sections.
