# Great Western Trail New Zealand: Companion App

![Version](https://img.shields.io/badge/v1.0.0-brightgreen) ![PWA Ready](https://img.shields.io/badge/PWA%20Ready-yes-blue) ![Offline First](https://img.shields.io/badge/Offline%20First-enabled-orange)

An unofficial interactive companion app designed to streamline setup, scoring, and rules reference for the board game Great Western Trail: New Zealand.

## Features
- 🧙‍♂️ **Interactive Setup Wizard**: Step-by-step guide with randomized buildings and player resource tracking.
- 🏆 **Competitive Scoring**: Calculator for 1-4 players with automatic leaderboard and tie-breakers.
- 📚 **The Codex**: Full-text search engine for rules and a visual gallery for iconography.
- 🛠️ **Smart Tools**: Wellington delivery checklist and Market refill assistants.
- 🧮 **Delivery Calculator**: Quick sum for distinct sheep values + certificates.
- 🧭 **Turn Guide**: Phase-by-phase reference for move, action, and draw.
- 💾 **State Persistence**: All inputs survive page refreshes using localStorage.
- 📱 **Installable PWA**: Works fully offline. Add to your home screen for an app-like experience.

## Tech Stack
- **Core**: React + TypeScript + Vite.
- **UI**: Tailwind CSS (Pastoral Theme) + Lucide Icons.
- **Logic**: Fuse.js (Search), VitePWA (Offline).
- **State Management**: localStorage for persistence (KISS principle).

## Development
```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

## Docker
```bash
docker build -t gwt-nz-companion .
docker run -p 8080:80 gwt-nz-companion
```

## Dev Log

### 2025-02-04: Compliance & Persistence Implementation
- **ESLint Fix**: Removed `plugin:react-refresh/recommended` from extends in `.eslintrc.cjs` (the top-level `name` property is incompatible with current ESLint config; the plugin is still available but not in the extends chain).
- **State Persistence**:
  - Scoring module: Persist `sheets`, `playerCount`, and `activePlayer` to localStorage. Clear All button now clears localStorage.
  - Setup module: Persist `setup` (buildings) and `playerCount` to localStorage.
  - SetupWizard: Persist `currentStepIndex` to maintain position across refreshes.
  - All localStorage keys are namespaced (`gwt-nz-*`) to avoid conflicts with other apps.
- **Documentation**: Added Dev Log and Roadmap sections to README.md per Gotrek Standard protocol.

### 2025-02-04: Sea Routes Board Implementation
- **Interactive Board**: Added a new tool to track ship positions and port discs.
- **Data Persistence**: Ship locations and claimed ports are saved to localStorage.
- **Responsive UI**: Optimized for mobile and desktop play.

### 2026-02-04: Game History & Archive Implementation
- **Type System**: Added `ArchivedGame` interface to `src/types/index.ts`.
- **New Module**: Created `src/modules/history/` with logic for archiving and a dedicated History page.
- **Scoring Integration**: Added "Archive Session" button to `src/modules/scoring/ScoringPage.tsx` with success feedback.
- **Navigation**: Added History module to dashboard with History icon from lucide-react.

## Roadmap

### Near-Term Enhancements
- **Advanced Tie-Breakers**: Implement official game tie-breaking rules (e.g., most money, most buildings) for more accurate leaderboard resolution.
- **Interactive Sea Routes Board**: Visual board component allowing players to track delivery routes and claimed locations. (MVP COMPLETED)
- **Game History/Archive**: Store completed game sessions with timestamps for historical reference. (COMPLETED)

### Future Considerations
- **Cloud Sync**: Optional account system for syncing across devices.
- **Offline Rulebook PDF**: Embedded or cached rulebook for complete offline reference.
- **Multiplayer Mode**: Real-time state synchronization for remote play sessions.

## Legal & Credits
- **Author**: Sinimus ().
- **Disclaimer**: This is a fan-made project. It is not affiliated with, endorsed, or sponsored by Eggertspiele, Plan B Games, or Alexander Pfister. All game art and mechanics are property of their respective owners.
- **License**: GPL-3.0.