import { Router } from 'express';
import { readSignups, writeSignups } from '../lib/store.js';

export const signupRouter = Router();

/**
 * POST /api/signup
 * Body: { name: string, email: string }
 * Response: { message: string, user: { id, name, email, createdAt } }
 */
signupRouter.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    // ── Validation ───────────────────────────────────
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters.');
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('A valid email address is required.');
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(' ') });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // ── Check for duplicates ─────────────────────────
    const signups = await readSignups();
    const existing = signups.find((u) => u.email === cleanEmail);

    if (existing) {
      return res.status(409).json({
        message: 'This email is already registered. Welcome back!',
      });
    }

    // ── Store new signup ─────────────────────────────
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: cleanName,
      email: cleanEmail,
      createdAt: new Date().toISOString(),
    };

    signups.push(newUser);
    await writeSignups(signups);

    console.log(`[SIGNUP] New member: ${cleanName} <${cleanEmail}>`);

    res.status(201).json({
      message: `Welcome to Iron Core Fitness, ${cleanName}! We'll be in touch soon.`,
      user: newUser,
    });
  } catch (err) {
    console.error('[SIGNUP ERROR]', err);
    res.status(500).json({ message: 'Signup failed. Please try again later.' });
  }
});

/**
 * GET /api/signup
 * Returns all signups (admin/debug use)
 */
signupRouter.get('/', async (_req, res) => {
  try {
    const signups = await readSignups();
    res.json({ count: signups.length, signups });
  } catch (err) {
    console.error('[SIGNUP LIST ERROR]', err);
    res.status(500).json({ message: 'Failed to retrieve signups.' });
  }
});
