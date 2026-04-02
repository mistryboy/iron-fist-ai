import Groq from 'groq-sdk';

/**
 * Iron Core Fitness — Vercel Serverless Chat Function
 * 
 * This function processes chatbot messages using Groq SDK and Llama 3.1.
 * It is designed specifically for Vercel Serverless Functions.
 */

const SYSTEM_PROMPT = `You are Iron Core AI, a premium gym assistant. Be friendly, motivating, and concise (2–3 sentences max). Help with fitness, gym info, pricing, and training guidance.`;

export default async function handler(req, res) {
  // 1. Method Validation
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 2. Input Validation
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ message: 'Message is required.' });
    }

    // 3. API Key Validation
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('[SERVER ERROR] GROQ_API_KEY is not defined.');
      return res.status(500).json({ message: 'AI Chat is currently unavailable. Please check server configuration.' });
    }

    const groq = new Groq({ apiKey });

    // 4. Prepare Conversation Structure
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      })),
      { role: 'user', content: message.trim() }
    ];

    // 5. Generate Response
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 256,
      top_p: 0.9,
    });

    const reply = completion.choices[0]?.message?.content ||
      "Forge ahead! I'm having a brief issue connecting, but don't lose your momentum. Try again in a moment!";

    // 6. Return standard JSON response
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('[CHAT ERROR]', err);

    // Handle Groq rate limits or external errors
    if (err.status === 429) {
      return res.status(429).json({ message: 'The AI is taking a quick breather. Please try again in a moment!' });
    }

    // Default 500 Server Error
    return res.status(500).json({ message: 'Internal server error processing your request.' });
  }
}
