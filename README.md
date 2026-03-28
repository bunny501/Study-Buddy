# Study Buddy 📚

A peer-to-peer collaborative learning platform.

## Quick Start

### Backend
```bash
cd server
npm install
# Edit .env with your MongoDB URI
npm start
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Deployment

### Backend → Render
1. Push `server/` to GitHub
2. Create a new Web Service on Render
3. Set env vars: `MONGO_URI`, `JWT_SECRET`

### Frontend → Vercel
1. Push `client/` to GitHub
2. Import to Vercel
3. Set env var: `VITE_API_URL=https://your-render-url.onrender.com`

## Features
- Auth (login/register)
- My Notes with confusion tagging (❓⚠️💡)
- Groups with chat, notes, tasks
- Partner Match with DM chat
- Live Peer Tests with timer
- Battle of Groups with leaderboard
- Post-battle discussion with upvotes
- Doubt system with notifications
- Profile with friends & progress
- Dark mode toggle
