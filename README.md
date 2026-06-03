# Async Race

**Score: 400 / 400** (self-assessment)

**Deployment:** https://gevharutyunyan77.github.io/Async-Race/

## About

Single Page Application for managing radio-controlled cars, running races, and tracking winners. Built with **React 18+**, **Redux Toolkit**, and **TypeScript** (strict mode).

Connects to the [async-race-api](https://github.com/mikhama/async-race-api) mock server.

## Setup

### 1. Start the API server

```bash
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start
```

The server runs at `http://127.0.0.1:3000`.

### 2. Start the frontend

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies API requests to the mock server.

For production builds, set `VITE_API_URL` to your API base URL (e.g. `http://127.0.0.1:3000`).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (Airbnb) check |
| `npm run format` | Prettier auto-format |
| `npm run ci:format` | Prettier check (CI) |

## Tech Stack

- React 19 + TypeScript (strict, `noImplicitAny`)
- Redux Toolkit for state management
- Vite for bundling
- ESLint (Airbnb) + Prettier

## Project Structure

```
src/
├── api/           # fetch wrappers for garage, engine, winners
├── app/           # Redux store and typed hooks
├── components/    # UI components (Garage, Winners, CarTrack, etc.)
├── constants/     # App constants (pagination limits, API config)
├── features/      # Redux slices and thunks
├── types/         # TypeScript interfaces
└── utils/         # Helpers (validation, random car generation)
```

---

## Checklist 400/400 pts

### UI Deployment

- [x] **Deployment Platform** — GitHub Pages

### Requirements to Commits and Repository

- [x] **Commit guidelines compliance**
- [x] **Checklist included in README.md**
- [x] **Score calculation**
- [x] **UI Deployment link in README.md**

### Basic Structure (80 points)

- [x] **Two Views (10)** — Garage and Winners
- [x] **Garage View Content (30)** — Name, car panel, race controls, garage section
- [x] **Winners View Content (10)** — Name, table, pagination
- [x] **Persistent State (30)** — Page numbers and form inputs preserved between views

### Garage View (90 points)

- [x] **Car Creation And Editing Panel. CRUD Operations (20)**
- [x] **Color Selection (10)**
- [x] **Random Car Creation (20)** — 100 cars per click
- [x] **Car Management Buttons (10)**
- [x] **Pagination (10)** — 7 cars per page
- [x] **Empty Garage (10)** — "No Cars" message
- [x] **Empty Garage Page (10)** — Navigate to previous page when last car deleted

### Winners View (50 points)

- [x] **Display Winners (15)**
- [x] **Pagination for Winners (10)** — 10 per page
- [x] **Winners Table (15)** — №, icon, name, wins, best time
- [x] **Sorting Functionality (10)** — Sort by wins and time via API

### Race (170 points)

- [x] **Start Engine Animation (20)**
- [x] **Stop Engine Animation (20)**
- [x] **Responsive Animation (30)**
- [x] **Start Race Button (10)**
- [x] **Reset Race Button (15)**
- [x] **Winner Announcement (5)**
- [x] **Button States (20)**
- [x] **Actions during the race (50)** — Buttons blocked during active race

### Prettier and ESLint Configuration (10 points)

- [x] **Prettier Setup (5)**
- [x] **ESLint Configuration (5)**

### Overall Code Quality (100 points) — reviewer discretion

- [x] Modular design (api / features / components)
- [x] Function modularization (≤ 40 lines)
- [x] No magic numbers (constants file)
- [x] Custom hooks for data fetching
