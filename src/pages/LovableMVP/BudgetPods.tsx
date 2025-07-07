
import React from "react";
import { Group, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const pods = [
  {
    title: "Flatmates",
    members: [
      { name: "Alex", color: "bg-blue-600" },
      { name: "Maria", color: "bg-emerald-600" },
      { name: "Jordi", color: "bg-purple-600" },
    ],
    expenses: [
      { label: "Rent", amount: "€300", by: "Alex" },
      { label: "Groceries", amount: "€45", by: "Maria" },
    ],
    balance: "+ €185.00",
    balanceMsg: "Your balance: + €185.00 (Others owe you money 💰)",
    balanceColor: "text-green-400",
    balanceBg: "bg-green-900/20 border-green-700/30",
    membersPill: "3 members",
    balanceHint: "Others owe you money 💰",
  },
  {
    title: "Trip to Barcelona",
    members: [
      { name: "Alex", color: "bg-blue-600" },
      { name: "Maria", color: "bg-emerald-600" },
      { name: "Jordi", color: "bg-purple-600" },
      { name: "Sarah", color: "bg-yellow-500" },
    ],
    expenses: [
      { label: "Hotel", amount: "€200", by: "Sarah" },
    ],
    balance: "- €50.00",
    balanceMsg: "Your balance: - €50.00 (Time to settle up 🍝)",
    balanceColor: "text-red-400",
    balanceBg: "bg-red-900/20 border-red-700/30",
    membersPill: "4 members",
    balanceHint: "Time to settle up 🍝",
  },
];

const BudgetPods = () => (
  <div className="flex flex-col min-h-screen bg-neo-black relative overflow-hidden">
    {/* Enhanced background effects */}
    <div className="absolute inset-0 bg-gradient-to-br from-neo-teal/5 via-transparent to-neo-green/5 pointer-events-none" />
    <div className="absolute top-1/4 right-0 w-72 h-72 bg-neo-teal/10 rounded-full blur-3xl animate-float" />
    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neo-green/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

    {/* Enhanced Header nav */}
    <nav className="w-full flex items-center gap-3 px-4 py-6 glass-effect-light border-b border-neo-border shadow-sm relative z-10">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center rounded-2xl bg-neo-teal p-3 shadow-neon">
          <Group className="text-neo-black" size={24} />
        </span>
        <span className="text-xl font-bold text-neo-text font-space-grotesk tracking-tight">Pods</span>
      </div>
    </nav>

    {/* Enhanced Pod cards */}
    <div className="flex flex-col gap-8 w-full max-w-lg mx-auto py-8 px-4 flex-1 relative z-10">
      {pods.map((pod, idx) => (
        <div key={pod.title} className="rounded-3xl glass-effect shadow-lift border border-neo-border p-7 hover-lift transition-all duration-500 relative overflow-hidden group">
          {/* Card background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-neo-teal/5 to-neo-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-neo-text font-space-grotesk">{pod.title}</span>
              <Badge className="glass-effect-light text-neo-text font-semibold px-4 py-1.5 ml-2 border border-neo-border rounded-full font-outfit">{pod.membersPill}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-5 relative z-10">
            {pod.members.map((m, i) => (
              <Avatar key={m.name} className={`h-9 w-9 border-2 border-neo-border -ml-2 first:ml-0 ${m.color} shadow-enhanced hover:scale-110 transition-transform duration-300`}>
                <AvatarFallback className={`text-sm font-bold uppercase text-white ${m.color} font-outfit`}>{m.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>

          <div className="mb-5 relative z-10">
            <ul className="space-y-2">
              {pod.expenses.map((exp, i) => (
                <li key={i} className="flex items-center text-neo-text text-sm font-outfit">
                  <span className="font-semibold mr-2">{exp.label}</span>
                  <span className="mr-2 font-bold text-neo-teal">{exp.amount}</span>
                  <span className="text-neo-text-muted">by {exp.by}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`rounded-2xl px-5 py-4 mb-5 font-semibold text-base flex items-center gap-2 border glass-effect-light ${pod.balanceColor} font-outfit relative z-10`}>
            {pod.balanceMsg}
          </div>

          <div className="flex gap-3 relative z-10">
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-neo-teal text-neo-black font-semibold shadow-neon hover:shadow-neon-lg transition-all duration-300 text-sm hover:scale-105 font-outfit">
              <Plus size={18} /> Add Expense
            </button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl glass-effect-light text-neo-text font-semibold shadow-enhanced hover:scale-105 transition-all duration-300 text-sm border border-neo-border font-outfit">
              Settle Up
            </button>
          </div>
        </div>
      ))}

      {/* Enhanced Create New Pod card */}
      <div className="mt-4 border-2 border-dashed border-neo-teal/50 rounded-3xl flex flex-col items-center justify-center py-12 glass-effect shadow-lift hover-lift transition-all duration-500 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-neo-teal/10 to-neo-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
        
        <div className="mb-4 relative z-10">
          <span className="inline-flex items-center justify-center rounded-2xl bg-neo-teal p-4 shadow-neon animate-float">
            <Group className="text-neo-black" size={32} />
          </span>
        </div>
        <div className="text-xl font-bold text-neo-text mb-2 font-space-grotesk relative z-10">Create New Pod</div>
        <div className="text-neo-text-muted mb-6 text-sm font-outfit relative z-10">Start a new group for shared expenses</div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-neo-teal text-neo-black font-semibold shadow-neon hover:shadow-neon-lg transition-all duration-300 text-base hover:scale-105 font-outfit relative z-10">
          <Plus size={20} /> + Create Pod
        </button>
      </div>
    </div>
  </div>
);

export default BudgetPods;
