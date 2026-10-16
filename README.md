# CoinCrypto — Cryptocurrency Dashboard

A crypto market dashboard powered by the CoinRanking API: browse the top coins and exchanges, and drill into per-coin detail pages with price history charts.

## Features

- **Home** — global crypto stats and highlighted coins
- **Cryptocurrencies** — searchable list of the top 100 coins
- **Coin details** — price, rank, 24h volume, market cap, all-time high, number of markets/exchanges, coin description, and a price-history line chart with selectable time ranges (3h → 5y)
- **Exchanges** — exchange listings
- Global state with Redux, data fetching with Axios, UI with Ant Design

## Project structure

```
src/
├── App.tsx            # routes: /, /exchanges, /cryptocurrencies, /crypto/:coinId
├── Components/        # Navbar, LineChart
├── Pages/             # HomePage, Exchanges, CryptoCurrencies, CryptoDetails
├── Services/          # CoinRanking API client (Axios) + Redux actions/reducer
└── models/            # TypeScript API models
```

## Getting started

```bash
npm install
cp .env.example .env   # add your RapidAPI key
npm run dev
```

The app reads market data from the CoinRanking API via RapidAPI. Create a `.env` file (see `.env.example`) with your `VITE_RAPIDAPI_KEY` — the key is never committed to the repo.

## Scripts

| Script            | Description          |
| ----------------- | -------------------- |
| `npm run dev`     | Start the dev server |
| `npm run build`   | Type-check + build   |
| `npm run preview` | Preview the build    |

## Tech

- React 18, TypeScript, Vite
- Ant Design, Chart.js (react-chartjs-2)
- Redux Toolkit, react-redux, Axios, React Router
- millify, moment, html-react-parser
