
import React from 'react';
import { X, TrendingDown, ShoppingCart, Package, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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

interface BudgetAnalysisProps {
  budget: Budget;
  onClose: () => void;
}

const BudgetAnalysis = ({ budget, onClose }: BudgetAnalysisProps) => {
  const overspent = budget.spent > budget.weeklyLimit;
  const overAmount = Math.max(budget.spent - budget.weeklyLimit, 0);

  const getSavingTips = () => {
    if (budget.category === 'Groceries') {
      return [
        {
          icon: Package,
          title: 'Buy in Bulk',
          description: 'Purchase non-perishables in larger quantities to save 15-20%',
          savings: '€8-12/week'
        },
        {
          icon: ShoppingCart,
          title: 'Store Brands',
          description: 'Choose store brands over name brands for similar quality',
          savings: '€5-8/week'
        },
        {
          icon: DollarSign,
          title: 'Plan Meals',
          description: 'Create a weekly meal plan to avoid impulse purchases',
          savings: '€10-15/week'
        }
      ];
    }
    return [
      {
        icon: TrendingDown,
        title: 'Track Spending',
        description: 'Monitor your expenses more closely throughout the week',
        savings: '€5-10/week'
      },
      {
        icon: DollarSign,
        title: 'Set Daily Limits',
        description: 'Break down your weekly budget into daily spending limits',
        savings: '€3-7/week'
      }
    ];
  };

  const tips = getSavingTips();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Budget Analysis</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Budget Overview */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">{budget.category} Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">€{budget.spent.toFixed(2)}</p>
                  <p className="text-sm text-slate-400">Spent This Week</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">€{budget.weeklyLimit.toFixed(2)}</p>
                  <p className="text-sm text-slate-400">Weekly Limit</p>
                </div>
              </div>
              
              {overspent && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                  <p className="text-red-400 font-semibold text-center">
                    €{overAmount.toFixed(2)} over budget
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transaction History */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Recent Transactions</h3>
            <div className="space-y-2">
              {budget.transactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center bg-slate-800 rounded-lg p-3">
                  <div>
                    <p className="text-slate-200 font-medium">{transaction.merchant}</p>
                    <p className="text-xs text-slate-400">
                      {transaction.date.toLocaleDateString()} • {transaction.description}
                    </p>
                  </div>
                  <span className="text-slate-200 font-semibold">€{transaction.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Saving Tips */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {overspent ? 'Money-Saving Tips' : 'Ways to Save More'}
            </h3>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                        <tip.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-200 mb-1">{tip.title}</h4>
                        <p className="text-sm text-slate-400 mb-2">{tip.description}</p>
                        <span className="text-xs text-green-400 font-semibold bg-green-900/20 px-2 py-1 rounded">
                          Potential savings: {tip.savings}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700"
          >
            Got it!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BudgetAnalysis;
