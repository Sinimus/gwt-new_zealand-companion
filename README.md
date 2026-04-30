# Great Western Trail New Zealand: Companion App

![Version](https://img.shields.io/badge/v1.0.0-brightgreen) ![PWA Ready](https://img.shields.io/badge/PWA%20Ready-yes-blue) ![Offline First](https://img.shields.io/badge/Offline%20First-enabled-orange) ![License](https://img.shields.io/badge/license-GPL--3.0-blue)

An unofficial interactive command center designed to streamline setup, gameplay, and scoring for the board game **Great Western Trail: New Zealand**. This tool is optimized for mobile-first usage and works fully offline.

---

## 📖 Table of Contents
1. [Core Features](#-core-features)
2. [User Guide](#-user-guide)
3. [Tech Stack](#-tech-stack)
4. [Project Structure](#-project-structure)
5. [Installation & Development](#-installation--development)
6. [Architecture Decisions](#-architecture-decisions)
7. [Dev Log](#-dev-log)
8. [Roadmap](#-roadmap)
9. [Legal & Credits](#-legal--credits)

---

## ✨ Core Features

### 🧙‍♂️ Interactive Setup Wizard
- **Randomized Buildings**: Automatically generates side A or B for all 8 neutral buildings.
- **Player Scaling**: Adjusts board setup notes based on 2, 3, or 4 players.
- **Resource Tracker**: Provides starting coins and card counts based on turn order.

### 🏆 Competitive Scoring
- **Category-based Summation**: Input fields for Board Assets, Cards, and Tiles.
- **Advanced Tie-Breakers**: Implements official rules by comparing Remaining Money when Victory Points are tied.
- **Live Leaderboard**: Real-time ranking as scores are entered.

### 📚 The Codex
- **Full-Text Search**: Powered by Fuse.js for instant rules lookup and keyword matching.
- **Visual Gallery**: Iconography reference with descriptions for every symbol in the game.

### 🛠️ Smart Tools
- **Sea Routes Board**: Track ship positions and claimed ports with disc markers for all players.
- **Wellington Checklist**: Step-by-step phase guide to ensure no bonuses are missed during delivery.
- **Delivery Calculator**: Sum unique sheep values and certificates efficiently.
- **Market Refill Guide**: Visual instructions for workers and bonus tile refills.

### 💾 Persistence & PWA
- **State Preservation**: All inputs (scoring, setup, ship positions) are saved to `localStorage`.
- **Offline First**: PWA support allows installation on iOS/Android and full functionality without an internet connection.

---

## 🕹️ User Guide

### 1. Starting a Game
1. Navigate to the **Setup** module.
2. Select your player count (2-4).
3. Follow the steps to randomize buildings and prepare player resources.

### 2. During Gameplay
- Use the **Tools > Sea Routes** tab to track ship progress on the NZ map.
- Use **Tools > Wellington** when reaching the end of the trail to resolve delivery steps.
- Search for icon meanings or specific rules in the **Codex** if questions arise.

### 3. Ending the Game
1. Navigate to **Scoring**.
2. Enter the data for each player. If players are tied, enter their **Remaining Money** in the Tie-Breaker section.
3. Click **Archive Session** to save the result permanently.
4. View past performance in the **History** module.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom "Pastoral" theme)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Search**: [Fuse.js](https://www.fusejs.io/)
- **Offline**: [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- **State**: Native `localStorage` persistence (KISS approach)

---

## 📂 Project Structure

```text
src/
├── components/          # Shared UI (Buttons, Layout, Cards)
├── data/                # JSON assets (Buildings, Rules, Icons)
├── lib/                 # Utility functions and shared data loaders
├── modules/             # Domain-driven feature modules
│   ├── codex/           # Search logic and Icon Gallery
│   ├── history/         # Archive logic and History List
│   ├── scoring/         # Calculator logic and Leaderboard
│   ├── setup/           # Randomized wizard steps
│   └── tools/           # Gameplay widgets (Sea Routes, Calculators)
├── types/               # Centralized TypeScript interfaces
└── App.tsx              # Main Router and Dashboard
```

---

## 🚀 Installation 

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)

### Local Development
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run linting
pnpm lint

# Build for production
pnpm build
```

---

## 🏛️ Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering | Static SPA (Vite + React) | No backend required — all game logic runs in the browser |
| Persistence | `localStorage` | KISS — avoids external DB/auth for a single-device companion tool |
| State management | Native `useState` + `useEffect` | No complex async flows; TanStack Query would be overkill |
| Module structure | Domain-driven folders | Each game concern is isolated and independently testable |
| Offline support | Vite PWA Plugin (Workbox) | Enables home-screen install and full offline play |
| Styling | Tailwind CSS v3 + custom "Pastoral" theme | Consistent thematic tokens without runtime CSS-in-JS overhead |

---

## 🛠️ Dev Log

### v1.0.0 (2026-02)

**Persistence & ESLint fix**
- Fixed `react-refresh` plugin configuration error in `.eslintrc.cjs` (top-level `name` property conflict).
- Implemented `localStorage` persistence for Scoring (`sheets`, `playerCount`, `activePlayer`), Setup (buildings, `currentStepIndex`), and Sea Routes board state.

**Sea Routes Board (MVP)**
- Added `Port` and `SeaBoardState` types.
- Interactive schematic board tracking ship positions (per player) and claimed port discs.
- State key: `gwt-nz-sea-state`.

**Advanced Tie-Breakers**
- Extended `ScoreSheet` with `remainingMoney: number`.
- `buildLeaderboard` now sorts by total VP (DESC), then remaining money (DESC).
- UI distinguishes tie-broken rankings visually in the leaderboard.

**Game History & Archive**
- New `history` module: `archiveGame`, `getArchivedGames`, `deleteArchivedGame`.
- "Archive Session" button in Scoring saves completed games to `gwt-nz-archive`.
- History page lists games in reverse-chronological order with winner highlighting.
- Cross-tab sync via `window.focus` event listener.

---

## 🗺️ Roadmap

### Near-term
- [ ] **History export/import** — JSON download of all archived games for backup or sharing
- [ ] **Score breakdown in history** — expandable card showing full per-category breakdown
- [ ] **Statistics dashboard** — win rates, average VP, per-player performance over sessions

### Mid-term
- [ ] **NZ map for Sea Routes** — SVG-based geographical map replacing the schematic list
- [ ] **Setup presets** — save and recall custom building layouts for repeated setups
- [ ] **Share game result** — generate a shareable summary (URL or image)

### Long-term / Stretch
- [ ] **Cloud sync** — optional cross-device persistence (Supabase or similar)
- [ ] **GWT: Base game support** — extend companion to cover the original GWT

---

## ⚖️ Legal
- **Disclaimer**: This is a fan-made project. It is not affiliated with, endorsed, or sponsored by Eggertspiele, Plan B Games, or Alexander Pfister. All game art and mechanics are property of their respective owners.
- **License**: [GPL-3.0](LICENSE).
