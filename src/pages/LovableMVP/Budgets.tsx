
import React, { useState } from 'react';
import { Target, TrendingDown, TrendingUp, Plus, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import BudgetCreator from '@/components/BudgetCreator';
import BudgetAnalysis from '@/components/BudgetAnalysis';

interface Budget {
  id: string;
  category: string;
  weeklyLimit: number;
  spent: number;
  weekStart: Date;
  transactions: Array<{
    date: Date;
    amount: number;
    merchant: string;
    description: string;
  }>;
}

const Budgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      category: 'Groceries',
      weeklyLimit: 100,
      spent: 67.50,
      weekStart: new Date(2024, 5, 17), // June 17, 2024
      transactions: [
        { date: new Date(2024, 5, 17), amount: 23.45, merchant: 'SuperMarket Plus', description: 'Weekly groceries' },
        { date: new Date(2024, 5, 19), amount: 15.20, merchant: 'Fresh Foods', description: 'Fruits & vegetables' },
        { date: new Date(2024, 5, 20), amount: 28.85, merchant: 'SuperMarket Plus', description: 'Household items' },
      ]
    }
  ]);

  const [showCreator, setShowCreator] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  const getWeekProgress = (budget: Budget) => {
    const now = new Date();
    const weekStart = budget.weekStart;
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    
    const totalDays = 7;
    const daysPassed = Math.min(Math.floor((now.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)), totalDays);
    
    return {
      daysPassed,
      daysLeft: Math.max(totalDays - daysPassed, 0),
      isComplete: daysPassed >= totalDays
    };
  };

  const getBudgetStatus = (budget: Budget) => {
    const spentPercentage = (budget.spent / budget.weeklyLimit) * 100;
    const remaining = budget.weeklyLimit - budget.spent;
    const progress = getWeekProgress(budget);
    
    if (remaining < 0) {
      return {
        status: 'over',
        color: 'text-red-400',
        bgColor: 'bg-red-900/20 border-red-700/30',
        message: `€${Math.abs(remaining).toFixed(2)} over budget`,
        canInvest: false
      };
    } else if (progress.isComplete && remaining > 0) {
      return {
        status: 'under',
        color: 'text-green-400',
        bgColor: 'bg-green-900/20 border-green-700/30',
        message: `€${remaining.toFixed(2)} saved!`,
        canInvest: true
      };
    } else {
      return {
        status: 'on-track',
        color: 'text-blue-400',
        bgColor: 'bg-blue-900/20 border-blue-700/30',
        message: `€${remaining.toFixed(2)} remaining`,
        canInvest: false
      };
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* Header */}
      <nav className="w-full flex items-center justify-between gap-2 px-4 py-5 bg-slate-900 border-b border-slate-800 shadow">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-2">
            <Target className="text-white" size={24} />
          </span>
          <span className="text-lg font-bold text-white">Budgets</span>
        </div>
        <Button
          onClick={() => setShowCreator(true)}
          className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold shadow rounded-lg px-4 py-2 text-sm hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Budget
        </Button>
      </nav>

      {/* Main content */}
      <div className="flex flex-col gap-6 w-full max-w-lg mx-auto py-8 px-2 flex-1">
        {budgets.map((budget) => {
          const status = getBudgetStatus(budget);
          const progress = getWeekProgress(budget);
          const spentPercentage = Math.min((budget.spent / budget.weeklyLimit) * 100, 100);

          return (
            <Card key={budget.id} className={`bg-slate-900 border-slate-800 shadow rounded-2xl ${status.bgColor} border`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    {budget.category}
                    {status.status === 'over' && <TrendingUp className="h-5 w-5 text-red-400" />}
                    {status.status === 'under' && <TrendingDown className="h-5 w-5 text-green-400" />}
                  </CardTitle>
                  <Badge className={`${status.color} font-semibold bg-transparent border-current`}>
                    {status.message}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 pb-4 px-6">
                <div className="space-y-4">
                  {/* Budget Progress */}
                  <div>
                    <div className="flex justify-between text-sm text-slate-300 mb-2">
                      <span>€{budget.spent.toFixed(2)} spent</span>
                      <span>€{budget.weeklyLimit.toFixed(2)} budget</span>
                    </div>
                    <Progress 
                      value={spentPercentage} 
                      className="h-3 bg-slate-800"
                    />
                  </div>

                  {/* Week Progress */}
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Day {progress.daysPassed} of 7</span>
                    <span>{progress.daysLeft} days left</span>
                  </div>

                  {/* Recent Transactions */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-slate-300">Recent Transactions</h4>
                    {budget.transactions.slice(-2).map((transaction, index) => (
                      <div key={index} className="flex justify-between items-center text-sm bg-slate-800/50 rounded-lg p-2">
                        <div>
                          <span className="text-slate-200">{transaction.merchant}</span>
                          <p className="text-xs text-slate-400">{transaction.date.toLocaleDateString()}</p>
                        </div>
                        <span className="text-slate-200 font-medium">€{transaction.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    {status.canInvest && (
                      <Button 
                        className="flex-1 bg-gradient-to-br from-green-600 to-emerald-600 text-white font-semibold shadow rounded-lg py-2 text-sm hover:from-green-700 hover:to-emerald-700"
                      >
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        Invest Savings
                      </Button>
                    )}
                    <Button 
                      onClick={() => setSelectedBudget(budget)}
                      variant="outline"
                      className="flex-1 border border-slate-600 text-slate-300 bg-slate-800 font-semibold shadow rounded-lg py-2 text-sm hover:bg-slate-700"
                    >
                      View Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {budgets.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No budgets yet</h3>
            <p className="text-slate-400 mb-6">Create your first budget to start tracking your spending</p>
            <Button
              onClick={() => setShowCreator(true)}
              className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold shadow rounded-lg px-6 py-3 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Budget
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreator && (
        <BudgetCreator
          onClose={() => setShowCreator(false)}
          onSave={(newBudget) => {
            setBudgets([...budgets, { ...newBudget, id: Date.now().toString() }]);
            setShowCreator(false);
          }}
        />
      )}

      {selectedBudget && (
        <BudgetAnalysis
          budget={selectedBudget}
          onClose={() => setSelectedBudget(null)}
        />
      )}
    </div>
  );
};

export default Budgets;
