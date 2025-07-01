
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BudgetCreatorProps {
  onClose: () => void;
  onSave: (budget: {
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
  }) => void;
}

const BudgetCreator = ({ onClose, onSave }: BudgetCreatorProps) => {
  const [category, setCategory] = useState('');
  const [weeklyLimit, setWeeklyLimit] = useState('');

  const categories = [
    'Groceries', 'Dining Out', 'Transportation', 'Entertainment', 
    'Shopping', 'Healthcare', 'Utilities', 'Other'
  ];

  const handleSave = () => {
    if (!category || !weeklyLimit) return;

    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // Start of current week

    onSave({
      category,
      weeklyLimit: parseFloat(weeklyLimit),
      spent: 0,
      weekStart,
      transactions: []
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Create Budget</h2>
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
          <div>
            <Label className="text-sm font-medium text-slate-300 mb-3 block">Category</Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  variant={category === cat ? "default" : "outline"}
                  className={`text-sm ${
                    category === cat
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                      : 'border-slate-600 text-slate-300 bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="weeklyLimit" className="text-sm font-medium text-slate-300">
              Weekly Budget Limit (€)
            </Label>
            <Input
              id="weeklyLimit"
              type="number"
              value={weeklyLimit}
              onChange={(e) => setWeeklyLimit(e.target.value)}
              placeholder="100.00"
              className="mt-2 bg-slate-800 border-slate-600 text-slate-100"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 bg-slate-800 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!category || !weeklyLimit}
              className="flex-1 bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700"
            >
              Create Budget
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCreator;
