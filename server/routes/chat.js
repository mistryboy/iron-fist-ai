import { Router } from 'express';
import Groq from 'groq-sdk';

export const chatRouter = Router();

const SYSTEM_PROMPT = `You are the AI assistant for Iron Core Fitness, a premium gym.
Your name is "Iron Core AI". Be friendly, motivating, and concise (2-3 sentences max).

You can help with:
- Membership plans & pricing
- Gym hours (Mon-Fri 5AM-11PM, Sat-Sun 7AM-9PM, 24/7 for members)
- Training programs & classes
- Facility information (weights, cardio, pool, sauna)
- Trainer availability
- General fitness advice

Location: 1234 Iron Way, Fitness District, NY 10001
Phone: +1 (555) 123-4567
Email: info@ironcorefit.com

If asked about specific pricing, say plans start at $29/month and suggest visiting or calling for a personalized quote.
Always be encouraging and end with a call-to-action when relevant.`;

/**
 * POST /api/chat
 * Body: { message: string, history?: { role: 'user' | 'assistant', content: string }[] }
 * Response: { reply: string }
 */
chatRouter.post('/', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ message: 'Message is required.' });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(503).json({
        message: 'AI chat is not configured. Please set GROQ_API_KEY in your .env file.',
      });
    }

    const groq = new Groq({ apiKey });

    // ── Build conversation for Groq SDK ────────────────
    // Groq (OpenAI-compatible) expects: { role: 'system' | 'user' | 'assistant', content: string }
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      })),
      { role: 'user', content: message.trim() }
    ];

    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.1-8b-instant', // Ultra-fast Llama 3.1 model
      temperature: 0.7,
      max_tokens: 256,
      top_p: 0.9,
    });

    const reply = completion.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response right now. Please try again!";

    console.log(`[CHAT] User: "${message.trim().slice(0, 60)}..." → Groq AI replied`);

    res.json({ reply });
  } catch (err) {
    console.error('[CHAT ERROR]', err);

    // Handle Groq rate limits cleanly
    if (err.status === 429) {
      return res.status(429).json({ message: 'The AI service is currently experiencing high traffic. Please try again later.' });
    }

    res.status(500).json({
      message: 'Failed to process your message. Please try again.',
    });
  }
});
