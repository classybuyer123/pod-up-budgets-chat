import React from "react";
import { Group, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const pods = [
  {
    title: "Flatmates",
    members: [
      { name: "Alex", color: "bg-fuchsia-500" },
      { name: "Maria", color: "bg-emerald-500" },
      { name: "Jordi", color: "bg-sky-500" },
    ],
    expenses: [
      { label: "Rent", amount: "€300", by: "Alex" },
      { label: "Groceries", amount: "€45", by: "Maria" },
    ],
    balance: "+ €185.00",
    balanceMsg: "Your balance: + €185.00 (Others owe you money 💰)",
    balanceColor: "text-green-400",
    balanceBg: "bg-green-950",
    membersPill: "3 members",
    balanceHint: "Others owe you money 💰",
  },
  {
    title: "Trip to Barcelona",
    members: [
      { name: "Alex", color: "bg-fuchsia-500" },
      { name: "Maria", color: "bg-emerald-500" },
      { name: "Jordi", color: "bg-sky-500" },
      { name: "Sarah", color: "bg-yellow-400" },
    ],
    expenses: [
      { label: "Hotel", amount: "€200", by: "Sarah" },
    ],
    balance: "- €50.00",
    balanceMsg: "Your balance: - €50.00 (Time to settle up 🍝)",
    balanceColor: "text-red-400",
    balanceBg: "bg-red-950",
    membersPill: "4 members",
    balanceHint: "Time to settle up 🍝",
  },
];

const BudgetPods = () => (
  <div className="flex flex-col min-h-screen bg-slate-950">
    {/* Header nav */}
    <nav className="w-full flex items-center gap-2 px-4 py-5 bg-slate-900 border-b border-slate-800 shadow">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-600 to-pink-500 p-2">
          <Group className="text-white" size={24} />
        </span>
        <span className="text-lg font-bold text-white">Pods</span>
      </div>
    </nav>
    {/* Pod cards */}
    <div className="flex flex-col gap-8 w-full max-w-lg mx-auto py-8 px-2 flex-1">
      {pods.map((pod, idx) => (
        <div key={pod.title} className="rounded-2xl bg-slate-900 shadow-lg border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-white">{pod.title}</span>
              <Badge className="bg-slate-800 text-slate-200 font-semibold px-3 py-1 ml-2">{pod.membersPill}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            {pod.members.map((m, i) => (
              <Avatar key={m.name} className={`h-8 w-8 border-2 border-slate-950 -ml-2 first:ml-0 ${m.color}`}>
                <AvatarFallback className={`text-xs font-bold uppercase ${m.color}`}>{m.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="mb-4">
            <ul className="space-y-1">
              {pod.expenses.map((exp, i) => (
                <li key={i} className="flex items-center text-slate-200 text-sm">
                  <span className="font-semibold mr-1">{exp.label}</span>
                  <span className="mr-1">{exp.amount}</span>
                  <span className="text-slate-400">by {exp.by}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`rounded-xl px-4 py-3 mb-4 font-semibold text-base flex items-center gap-2 ${pod.balanceBg} ${pod.balanceColor}`}>
            {pod.balanceMsg}
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-fuchsia-600 text-white font-semibold shadow hover:bg-fuchsia-700 transition text-sm">
              <Plus size={18} /> Add Expense
            </button>
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-800 text-slate-100 font-semibold shadow hover:bg-slate-700 transition text-sm border border-slate-700">
              Settle Up
            </button>
          </div>
        </div>
      ))}
      {/* Create New Pod card */}
      <div className="mt-2 border-2 border-dashed border-fuchsia-500 rounded-2xl flex flex-col items-center justify-center py-10 bg-slate-900 shadow">
        <div className="mb-3">
          <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-600 to-pink-500 p-3">
            <Group className="text-white" size={28} />
          </span>
        </div>
        <div className="text-lg font-bold text-white mb-1">Create New Pod</div>
        <div className="text-slate-400 mb-4 text-sm">Start a new group for shared expenses</div>
        <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-fuchsia-600 text-white font-semibold shadow hover:bg-fuchsia-700 transition text-base">
          <Plus size={20} /> + Create Pod
        </button>
      </div>
    </div>
  </div>
);

export default BudgetPods; 