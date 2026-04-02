import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { signupRouter } from './routes/signup.js';
import { chatRouter } from './routes/chat.js';

config();

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

// Request logger
app.use((req, _res, next) => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${req.method} ${req.url}`);
  next();
});

// ── Routes ─────────────────────────────────────────────
app.use('/api/signup', signupRouter);
app.use('/api/chat', chatRouter);

// ── Health check ───────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// ── 404 catch-all ──────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// ── Global error handler ───────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ message: 'Internal server error' });
});

// ── Start ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n⚡ Iron Core API running on http://localhost:${PORT}`);
  console.log(`   Endpoints:`);
  console.log(`   POST /api/signup`);
  console.log(`   POST /api/chat`);
  console.log(`   GET  /api/health\n`);
});
