import type { NextApiRequest, NextApiResponse } from 'next';
import plaidClient from './utils/plaidClient';

// Mock in-memory storage
const userTokens: Record<string, string> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { public_token, userId } = req.body;
  if (!public_token || !userId) {
    return res.status(400).json({ error: 'Missing public_token or userId' });
  }
  try {
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    userTokens[userId] = response.data.access_token;
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Plaid token exchange failed' });
  }
}

// For mock access in other modules
declare global {
  // eslint-disable-next-line no-var
  var userTokens: typeof userTokens;
}
global.userTokens = global.userTokens || userTokens; 