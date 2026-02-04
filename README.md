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

## 🚀 Installation & Development

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

### Docker
```bash
docker build -t gwt-nz-companion .
docker run -p 8080:80 gwt-nz-companion
```

---

## 🏗️ Architecture Decisions

### Gotrek Standard Compliance
This project follows the **Gotrek Standard** for agentic development:
- **Separation of Concerns**: Logic is isolated from UI components in `logic.ts` files.
- **Functional Purity**: Scoring and setup calculations are deterministic and unit-tested.
- **Persistence Strategy**: All user-facing state is namespaced (`gwt-nz-*`) in `localStorage` to ensure durability without requiring a backend.

---

## 📝 Dev Log

### 2025-02-04: Compliance & Persistence
- Fixed ESLint configuration and established project standards.
- Implemented global state persistence for all modules.

### 2025-02-04: Sea Routes MVP
- Added the interactive ship/disc tracker for Port management.

### 2026-02-04: Game History
- Implemented the Archive system and the `/history` module for session tracking.
- Refined the Type system to unify `ActiveBuilding` and `PlayerScore`.

---

## 🗺️ Roadmap

- [x] **State Persistence**: Complete.
- [x] **Sea Routes Board**: MVP Complete.
- [x] **Game History**: Complete.
- [ ] **Data Portability**: JSON Export/Import for backups.
- [ ] **Visual Disc Tracker**: Interactive player board simulation for Scoring.
- [ ] **Handicap System**: Recommendations based on historical win rates.

---

## ⚖️ Legal & Credits

- **Author**: Sinimus ([](mailto:))
- **Disclaimer**: This is a fan-made project. It is not affiliated with, endorsed, or sponsored by Eggertspiele, Plan B Games, or Alexander Pfister. All game art and mechanics are property of their respective owners.
- **License**: [GPL-3.0](LICENSE).
