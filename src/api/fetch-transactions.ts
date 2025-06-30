import type { NextApiRequest, NextApiResponse } from 'next';
import plaidClient from './utils/plaidClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const userId = req.headers['x-user-id'] as string;
  if (!userId || !global.userTokens || !global.userTokens[userId]) {
    return res.status(401).json({ error: 'Unauthorized or missing access token' });
  }
  const access_token = global.userTokens[userId];
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);
  try {
    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: startDate.toISOString().slice(0, 10),
      end_date: endDate.toISOString().slice(0, 10),
    });
    const normalized = response.data.transactions.map((tx: any) => ({
      date: tx.date,
      amount: tx.amount,
      merchant: tx.merchant_name || tx.name,
      category: tx.category ? tx.category[0] : 'Other',
    }));
    return res.status(200).json(normalized);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch transactions' });
  }
} 