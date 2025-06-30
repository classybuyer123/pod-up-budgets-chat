const express = require("express");
const app = express();
const PORT = 3001;

// `/api/gigs` returns static gigs JSON
app.get("/api/gigs", (req, res) => {
  return res.json([
    { id: "1", title: "Social Media Content Creation", rate: "€25/hr", duration: "2-3 hrs", rating: 4.8, by: "StartupCo" },
    { id: "2", title: "React Frontend Development",   rate: "€45/hr", duration: "1 week",   rating: 4.9, by: "TechFirm" },
    { id: "3", title: "Python Data Analysis",         rate: "€35/hr", duration: "3 days",   rating: 4.7, by: "DataCorp" },
    { id: "4", title: "Node.js Backend API",          rate: "€40/hr", duration: "5 days",   rating: 4.8, by: "StartupHub" }
  ]);
});

// Catch-all for other /api routes
app.all("/api/*", (req, res) => res.sendStatus(404));

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
}); 