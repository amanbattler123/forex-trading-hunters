# Forex Trading Hunters (Landing Page)

## Quick start

1. Install deps

```bash
npm install
```

2. Run client + server

```bash
npm run dev
```

- React runs at `http://localhost:5173`
- Node/Express runs at `http://localhost:5174`

## API

- `POST /api/lead` – receives `{ name, email, experience }`
- `GET /api/health`

> Note: This demo stores leads in memory (server restart clears them). If you want, I can plug in a real email sender (SendGrid/Mailgun) or persist leads in a DB.
