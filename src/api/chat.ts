import type { NextApiRequest, NextApiResponse } from 'next';
import { openai } from './utils/openaiClient';

// Mock ledgers/configs
const podsLedger: Record<string, any[]> = {};
const investConfig: Record<string, any> = {};

function classifyIntent(message: string): 'balance' | 'earn' | 'split' | 'invest' | 'unknown' {
  if (/balance|transactions|spent/i.test(message)) return 'balance';
  if (/earn|gig|job|side hustle/i.test(message)) return 'earn';
  if (/split|with @/i.test(message)) return 'split';
  if (/invest|roundup|etf|percent|lockup/i.test(message)) return 'invest';
  return 'unknown';
}

async function fetchTransactions(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/fetch-transactions`, {
    headers: { 'x-user-id': userId },
  });
  return res.ok ? await res.json() : [];
}

async function fetchGigs(skills: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/gigs?skills=${encodeURIComponent(skills)}`);
  return res.ok ? await res.json() : [];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { userId, message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ error: 'Missing userId or message' });
  }
  const intent = classifyIntent(message);
  let systemPrompt = '';
  let userPrompt = '';
  let buttons;
  if (intent === 'balance') {
    const txs = await fetchTransactions(userId);
    userPrompt = `User wants to know their balance. Recent transactions: ${JSON.stringify(txs)}`;
  } else if (intent === 'earn') {
    const skillsMatch = message.match(/skills?:? ([\w, ]+)/i);
    const skills = skillsMatch ? skillsMatch[1] : 'react,javascript';
    const gigs = await fetchGigs(skills);
    userPrompt = `User wants to earn. Top gigs: ${JSON.stringify(gigs)}`;
    buttons = gigs.map((g: any) => ({ label: g.title, action: g.link }));
  } else if (intent === 'split') {
    const splitMatch = message.match(/paid (\d+(?:\.\d+)?)\D+split with ([^\s]+)/i);
    if (splitMatch) {
      const amount = parseFloat(splitMatch[1]);
      const users = splitMatch[2].split(',').map((u: string) => u.replace('@', ''));
      podsLedger[userId] = podsLedger[userId] || [];
      podsLedger[userId].push({ amount, users });
      userPrompt = `User split ${amount} with ${users.join(', ')}. Ledger updated.`;
    } else {
      userPrompt = 'User tried to split a payment but format was invalid.';
    }
  } else if (intent === 'invest') {
    const investMatch = message.match(/set invest (\w+)\/(\d+)%? (\w+)/i);
    if (investMatch) {
      const [_, type, percent, etf] = investMatch;
      investConfig[userId] = { type, percent, etf };
      userPrompt = `User set invest config: ${type}, ${percent}%, ${etf}.`;
    } else {
      userPrompt = 'User tried to set invest config but format was invalid.';
    }
  } else {
    userPrompt = 'General chat.';
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-2025-04-14',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });
    const reply = completion.choices[0].message?.content || 'Sorry, I could not generate a reply.';
    return res.status(200).json({ reply, buttons });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate reply' });
  }
}
