### /Users/editor/Development/Personal/gwt-new_zealand-companion/README.md
```markdown
1: # Great Western Trail New Zealand: Companion App
2: 
3: ![Version](https://img.shields.io/badge/v1.0.0-brightgreen) ![PWA Ready](https://img.shields.io/badge/PWA%20Ready-yes-blue) ![Offline First](https://img.shields.io/badge/Offline%20First-enabled-orange)
4: 
5: An unofficial interactive companion app designed to streamline setup, scoring, and rules reference for the board game Great Western Trail: New Zealand.
6: 
7: ## Features
8: - 🧙‍♂️ **Interactive Setup Wizard**: Step-by-step guide with randomized buildings and player resource tracking.
9: - 🏆 **Competitive Scoring**: Calculator for 1-4 players with automatic leaderboard and tie-breakers.
10: - 📚 **The Codex**: Full-text search engine for rules and a visual gallery for iconography.
11: - 🛠️ **Smart Tools**: Wellington delivery checklist and Market refill assistants.
12: - 🧮 **Delivery Calculator**: Quick sum for distinct sheep values + certificates.
13: - 🧭 **Turn Guide**: Phase-by-phase reference for move, action, and draw.
14: - 💾 **State Persistence**: All inputs survive page refreshes using localStorage.
15: - 📱 **Installable PWA**: Works fully offline. Add to your home screen for an app-like experience.
16: 
17: ## Tech Stack
18: - **Core**: React + TypeScript + Vite.
19: - **UI**: Tailwind CSS (Pastoral Theme) + Lucide Icons.
20: - **Logic**: Fuse.js (Search), VitePWA (Offline).
21: - **State Management**: localStorage for persistence (KISS principle).
22: 
23: ## Development
24: ```bash
25: pnpm install
26: pnpm dev
27: pnpm lint
28: pnpm build
29: ```
30: 
31: ## Docker
32: ```bash
33: docker build -t gwt-nz-companion .
34: docker run -p 8080:80 gwt-nz-companion
35: ```
36: 
37: ## Dev Log
38: 
39: ### 2025-02-04: Compliance & Persistence Implementation
40: - **ESLint Fix**: Removed `plugin:react-refresh/recommended` from extends in `.eslintrc.cjs` (the top-level `name` property is incompatible with current ESLint config; the plugin is still available but not in the extends chain).
41: - **State Persistence**:
42:   - Scoring module: Persist `sheets`, `playerCount`, and `activePlayer` to localStorage. Clear All button now clears localStorage.
43:   - Setup module: Persist `setup` (buildings) and `playerCount` to localStorage.
44:   - SetupWizard: Persist `currentStepIndex` to maintain position across refreshes.
45:   - All localStorage keys are namespaced (`gwt-nz-*`) to avoid conflicts with other apps.
46: - **Documentation**: Added Dev Log and Roadmap sections to README.md per Gotrek Standard protocol.
47: 
48: ## Roadmap
49: 
50: ### Near-Term Enhancements
51: - **Advanced Tie-Breakers**: Implement official game tie-breaking rules (e.g., most money, most buildings) for more accurate leaderboard resolution.
52: - **Interactive Sea Routes Board**: Visual board component allowing players to track delivery routes and claimed locations.
53: - **Game History/Archive**: Store completed game sessions with timestamps for historical reference.
54: 
55: ### Future Considerations
56: - **Cloud Sync**: Optional account system for syncing across devices.
57: - **Offline Rulebook PDF**: Embedded or cached rulebook for complete offline reference.
58: - **Multiplayer Mode**: Real-time state synchronization for remote play sessions.
59: 
60: ## Legal & Credits
61: - **Author**: Sinimus ().
62: - **Disclaimer**: This is a fan-made project. It is not affiliated with, endorsed, or sponsored by Eggertspiele, Plan B Games, or Alexander Pfister. All game art and mechanics are property of their respective owners.
63: - **License**: GPL-3.0.
```
