import type { NextApiRequest, NextApiResponse } from "next";

// Vite serverless API handler for /api/gigs
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  return res.status(200).json([
    { "id":"1", "title":"Social Media Content Creation", "rate":"€25/hr", "duration":"2-3 hrs", "rating":4.8, "by":"StartupCo" },
    { "id":"2", "title":"React Frontend Development",   "rate":"€45/hr", "duration":"1 week",   "rating":4.9, "by":"TechFirm" },
    { "id":"3", "title":"Python Data Analysis",         "rate":"€35/hr", "duration":"3 days",   "rating":4.7, "by":"DataCorp" },
    { "id":"4", "title":"Node.js Backend API",          "rate":"€40/hr", "duration":"5 days",   "rating":4.8, "by":"StartupHub" }
  ]);
} 