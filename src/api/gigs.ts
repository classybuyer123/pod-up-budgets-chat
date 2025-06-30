import type { NextApiRequest, NextApiResponse } from 'next';

const mockGigs = [
  { title: 'React Developer', pay: 50, time: 3, client: 'Acme Corp', link: 'https://upwork.com/job/1', skills: ['react', 'javascript'] },
  { title: 'Node.js API', pay: 35, time: 2, client: 'Beta LLC', link: 'https://upwork.com/job/2', skills: ['node', 'api'] },
  { title: 'UI/UX Design', pay: 40, time: 4, client: 'Gamma Inc', link: 'https://upwork.com/job/3', skills: ['design', 'ui'] },
  { title: 'Python Script', pay: 60, time: 1, client: 'Delta Ltd', link: 'https://upwork.com/job/4', skills: ['python'] },
  { title: 'ETL Pipeline', pay: 80, time: 4, client: 'Epsilon GmbH', link: 'https://upwork.com/job/5', skills: ['etl', 'data'] },
  { title: 'WordPress Site', pay: 25, time: 2, client: 'Zeta AG', link: 'https://upwork.com/job/6', skills: ['wordpress'] },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const skillsParam = req.query.skills as string;
  if (!skillsParam) {
    return res.status(400).json({ error: 'Missing skills parameter' });
  }
  const skills = skillsParam.split(',').map(s => s.trim().toLowerCase());
  const filtered = mockGigs.filter(gig =>
    gig.pay >= 30 && gig.time <= 4 && skills.some(skill => gig.skills.includes(skill))
  ).slice(0, 5).map(({ title, pay, time, client, link }) => ({ title, pay, time, client, link }));
  return res.status(200).json(filtered);
} 