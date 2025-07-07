
import React from "react";
import { ChartBar, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Invested", value: "€156.75" },
  { label: "Current Value", value: "€162.4" },
];

const returns = { value: "€5.65", percent: "+3.6% gain" };

const settings = {
  method: "Round-ups",
  etf: "GREENY – Sustainable Energy ETF",
  lockup: "3 years",
  bonus: "+0.3% bonus",
};

const performance = [
  { month: "Apr", amount: "+€1.85", percent: "+1.2%" },
  { month: "May", amount: "+€2.10", percent: "+1.4%" },
  { month: "Jun", amount: "+€1.70", percent: "+1.0%" },
];

const contributions = [
  { date: "2024-06-21", label: "Coffee Roundup", amount: "+€0.80" },
  { date: "2024-06-20", label: "Groceries Roundup", amount: "+€1.20" },
  { date: "2024-06-18", label: "Lunch Roundup", amount: "+€0.65" },
  { date: "2024-06-17", label: "Dinner Roundup", amount: "+€0.90" },
];

const MicroInvest = () => (
  <div className="flex flex-col min-h-screen bg-neo-black">
    {/* Header nav */}
    <nav className="w-full flex items-center gap-2 px-4 py-5 bg-neo-dark border-b border-neo-border shadow-sm">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center rounded-full bg-neo-teal p-2">
          <ChartBar className="text-neo-black" size={24} />
        </span>
        <span className="text-lg font-bold text-neo-text">Invest</span>
      </div>
    </nav>
    {/* Main content */}
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto py-8 px-2 flex-1">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-neo-card border-neo-border shadow-sm rounded-xl">
            <CardContent className="py-4 px-5 flex flex-col items-center">
              <span className="text-xs text-neo-text-muted font-medium mb-1">{stat.label}</span>
              <span className="text-2xl font-bold text-neo-text">{stat.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Returns card */}
      <Card className="bg-gradient-to-br from-neo-teal to-neo-green shadow-lg rounded-2xl border-0">
        <CardContent className="py-6 px-6 flex flex-col items-center">
          <span className="text-lg text-neo-black font-semibold mb-1">Total Returns</span>
          <span className="text-3xl font-bold text-neo-black mb-1">{returns.value}</span>
          <span className="text-base font-medium text-neo-black/80">{returns.percent}</span>
        </CardContent>
      </Card>
      {/* Settings card */}
      <Card className="bg-neo-card border-neo-border shadow-sm rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg text-neo-text">Investment Settings</CardTitle>
          <Button size="sm" className="bg-neo-teal text-neo-black hover:bg-neo-teal-muted rounded-md px-4 py-1.5 text-sm font-semibold">Edit</Button>
        </CardHeader>
        <CardContent className="pt-0 pb-4 px-6">
          <div className="flex flex-col gap-2 text-neo-text text-sm">
            <div><span className="font-semibold">Method:</span> {settings.method}</div>
            <div><span className="font-semibold">ETF:</span> {settings.etf}</div>
            <div className="flex items-center gap-2"><span className="font-semibold">Lock-up:</span> {settings.lockup} <Badge className="ml-2 bg-neo-green/20 text-neo-green font-semibold border border-neo-green/30">{settings.bonus}</Badge></div>
          </div>
        </CardContent>
      </Card>
      {/* Monthly Performance */}
      <Card className="bg-neo-card border-neo-border shadow-sm rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-neo-text">Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4 px-6">
          <div className="flex flex-col gap-2">
            {performance.map((p) => (
              <div key={p.month} className="flex items-center justify-between text-neo-text text-sm">
                <span className="font-semibold w-12">{p.month}</span>
                <span className="w-20 text-right">{p.amount}</span>
                <span className="w-20 text-right text-neo-green">{p.percent}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Recent Contributions */}
      <Card className="bg-neo-card border-neo-border shadow-sm rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-neo-text">Recent Contributions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4 px-6">
          <div className="flex flex-col gap-2">
            {contributions.map((c, i) => (
              <div key={i} className="flex items-center gap-3 text-neo-text text-sm">
                <Calendar className="text-neo-teal" size={18} />
                <span className="w-32">{c.date}</span>
                <span className="flex-1">{c.label}</span>
                <span className="font-semibold text-neo-green">{c.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Footer buttons */}
      <div className="flex gap-3 mt-2 pb-8">
        <Button className="flex-1 bg-neo-teal text-neo-black font-semibold shadow rounded-lg py-3 text-base hover:bg-neo-teal-muted">Add Manual Investment</Button>
        <Button className="flex-1 border border-neo-teal text-neo-teal bg-neo-black font-semibold shadow rounded-lg py-3 text-base hover:bg-neo-dark" variant="outline">View Full Portfolio</Button>
      </div>
    </div>
  </div>
);

export default MicroInvest;
