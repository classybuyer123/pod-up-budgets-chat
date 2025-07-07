
import React from "react";
import { Briefcase, Upload, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

const stats = [
  { label: "This Week", value: "€127" },
  { label: "Potential", value: "€340/wk" },
];

const insights = [
  { tag: "JavaScript", demand: "High" },
  { tag: "React", demand: "Very High" },
  { tag: "Python", demand: "High" },
  { tag: "Node.js", demand: "High" },
  { tag: "Data Analysis", demand: "Medium" },
  { tag: "Social Media", demand: "Medium" },
];

const Earn = () => {
  const { data: gigs = [], isLoading } = useQuery({
    queryKey: ["gigs"],
    queryFn: () => fetch("/gigs.json").then((res) => res.json()) as Promise<any[]>,
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading gigs…</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-neo-black">
      {/* Header nav */}
      <nav className="w-full flex items-center gap-2 px-4 py-5 bg-neo-dark border-b border-neo-border shadow-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center rounded-full bg-neo-teal p-2">
            <Briefcase className="text-neo-black" size={24} />
          </span>
          <span className="text-lg font-bold text-neo-text">Earn</span>
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
        {/* CV Analysis upload card */}
        <Card className="bg-gradient-to-br from-neo-teal to-neo-green shadow-lg rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-neo-black">AI-Powered CV Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-6 flex flex-col items-center">
            <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-neo-black/40 rounded-xl py-8 bg-neo-black/5 mb-2">
              <Upload className="text-neo-black/70 mb-2" size={32} />
              <span className="text-neo-black font-semibold mb-1">Drag & drop your PDF CV</span>
              <span className="text-neo-black/70 text-xs">or click to upload</span>
            </div>
            <Button className="bg-neo-black text-neo-teal font-bold rounded-lg px-6 py-2 mt-2 shadow hover:bg-neo-dark transition">Upload PDF</Button>
          </CardContent>
        </Card>
        {/* Gig cards */}
        <div className="flex flex-col gap-4">
          {gigs.map((gig: any) => (
            <Card key={gig.id} className="bg-neo-card border-neo-border shadow-sm rounded-2xl">
              <CardContent className="py-4 px-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg font-bold text-neo-text">{gig.title}</span>
                  <span className="text-neo-teal font-semibold text-base">{gig.rate}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-neo-text-muted">{gig.duration}</span>
                  <span className="flex items-center gap-1 text-xs text-yellow-400 font-semibold">
                    <Star size={14} fill="#facc15" strokeWidth={0} /> {gig.rating}
                  </span>
                  <span className="text-xs text-neo-text-muted">by {gig.company}</span>
                </div>
                <Button className="bg-neo-teal text-neo-black font-semibold rounded-md px-4 py-1.5 text-sm shadow hover:bg-neo-teal-muted transition mt-1">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Market Insights */}
        <Card className="bg-neo-card border-neo-border shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-neo-text">Market Insights</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-6 flex flex-wrap gap-2">
            {insights.map((insight) => (
              <div key={insight.tag} className="flex items-center gap-2 bg-neo-border rounded-full px-4 py-1 border border-neo-border">
                <span className="text-sm text-neo-text font-semibold">{insight.tag}</span>
                <Badge className={`ml-1 ${insight.demand === "Very High" ? "bg-neo-green/80 text-neo-black" : insight.demand === "High" ? "bg-neo-teal/80 text-neo-black" : "bg-neo-text-muted/80 text-neo-black"}`}>{insight.demand}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        {/* Call-out */}
        <div className="rounded-2xl bg-gradient-to-br from-neo-teal to-neo-green shadow-lg flex flex-col items-center py-8 px-4 mt-2">
          <span className="text-2xl font-bold text-neo-black mb-2">Ready to Start Earning?</span>
          <Button className="bg-neo-black text-neo-teal font-bold rounded-lg px-8 py-3 mt-2 shadow hover:bg-neo-dark transition text-lg">Complete Profile</Button>
        </div>
      </div>
    </div>
  );
};

export default Earn;
