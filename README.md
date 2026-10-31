# Great Western Trail: New Zealand Companion

An unofficial companion for the board game **Great Western Trail: New Zealand**: setup for 1 to 4 players (solo
against Sarah included), rules and buildings with their rulebook pages, a few table helpers and the final scoring
pad. It is built for a phone next to the board and works offline as a PWA.

The app accompanies the game; it does not run it. It keeps no game state: no trackers, nothing saved between
visits. You play the game, not the app.

## Screens

- **Setup**: the setup of the Rulebook (p. 4-5) for the chosen player count, with the numbers that change by
  player count at a glance. Solo: the changes for Sarah and a reference of her turn, movement, actions and scoring
  (Solo rules p. 1-4). The player count lives in the address (`?players=1` to `4`).
- **Codex**: searchable rules topics, the 8 neutral buildings A to H (front and, for B, C, G and H, the flipped
  side) and the 10 private buildings on side a and b, from the Rules Appendix.
- **Tools**: the turn, Wellington, the bonus tiles market token, income and shearing calculators for all 11 sheep
  types, the sheep buying options by shepherds, and a reference of the sea routes board.
- **Scoring**: the 12 categories of the scoring pad (p. 19). A tie is a shared victory.

Every rule text is a paraphrase with a page reference (`p. N` for the Rulebook, `Appendix p. N`, `Solo p. N`),
never a quote. Check the rulebook when in doubt.

## Development

Node 24 and pnpm 10.

```bash
pnpm install
pnpm dev      # development server
pnpm test     # vitest
pnpm lint     # eslint, no warnings allowed
pnpm build    # tsc -b and vite build
pnpm test:e2e # Playwright against a running image on localhost:8080 (E2E_BASE_URL overrides)
```

`pnpm exec playwright install chromium` once before the first browser test. CI (`.github/workflows/pipeline.yml`) runs lint, type check and unit tests, then builds the production image, smoke-tests it and runs the browser test against it: every page in `e2e/routes.json` must render its heading from the bundle without a JavaScript or console error. A push to `main` publishes and deploys only after both jobs pass.

## Structure

```text
src/
├── data/rules/     # rule texts with page references, buildings, sheep, scoring categories
├── logic/          # pure functions (setup numbers, income, shearing, building, scoring) with tests
├── components/     # layout and shared rule components
└── modules/        # setup, codex, tools, scoring screens
```

## Legal

Fan-made project, not affiliated with, endorsed or sponsored by Eggertspiele, Plan B Games or Alexander Pfister.
Game names, art and mechanics belong to their owners. License: [GPL-3.0](LICENSE).
