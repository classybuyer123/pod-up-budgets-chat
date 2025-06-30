
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Users, Target, Zap, Coffee } from 'lucide-react';

interface Transaction {
  date: string;
  amount: number;
  category: string;
}

interface Pod {
  name: string;
  members: string[];
  ledger: any[];
}

interface UserData {
  transactions: Transaction[];
  balance: number;
  streak: number;
  skills: string[];
  pods: Pod[];
}

const BudgetDashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentTip, setCurrentTip] = useState<'save' | 'earn'>('save');

  useEffect(() => {
    // Simulate loading user data
    const sampleData: UserData = {
      transactions: [
        {"date":"2025-06-01","amount":-20,"category":"Dining"},
        {"date":"2025-06-02","amount":-15,"category":"Transport"},
        {"date":"2025-06-03","amount":500,"category":"Income"},
        {"date":"2025-06-04","amount":-50,"category":"Shopping"},
        {"date":"2025-06-05","amount":-30,"category":"Dining"},
        {"date":"2025-06-06","amount":-12,"category":"Transport"},
        {"date":"2025-06-07","amount":-80,"category":"Shopping"},
      ],
      balance: 1240,
      streak: 2,
      skills: ["graphic design", "copywriting"],
      pods: [{"name":"Flatmates","members":["Alex","Maria","Jordi"],"ledger":[]}]
    };
    setUserData(sampleData);
  }, []);

  if (!userData) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your financial insights...</p>
      </div>
    </div>;
  }

  // Calculate financial insights
  const totalIncome = userData.transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = userData.transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netSavings = totalIncome - totalExpenses;

  // Get top spending categories
  const categoryTotals = userData.transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const generateEarnTip = () => {
    const tips = [
      "🚀 Post a 2-hr logo design gig on Fiverr tonight—potential €50!",
      "✍️ Offer copywriting services on Upwork—you could earn €30/hour!",
      "📱 Create Instagram posts for local businesses—€25 per post!",
      "🎨 Design social media templates to sell on Etsy—passive income potential!"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const generateSaveTip = () => {
    const tips = [
      "☕ Skip the café—brew at home to save €3 today!",
      "🚇 Walk to nearby destinations instead of taking transport—save €5!",
      "🍽️ Cook dinner tonight instead of ordering—save €15!",
      "📱 Check for unused subscriptions you can cancel—save €10/month!"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💰 BudgetBuddy</h1>
          <p className="text-gray-600">Your AI Financial Coach</p>
        </div>

        {/* Morning Ping Message */}
        <Card className="p-4 bg-white border-l-4 border-l-green-500 shadow-lg">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              BB
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Today • 8:30 AM</p>
              <p className="text-gray-800">
                🌅 Good morning, Alex! Yesterday you spent €{Math.abs(userData.transactions[userData.transactions.length-1]?.amount || 0)} on {userData.transactions[userData.transactions.length-1]?.category || 'expenses'}. 
                Net {netSavings >= 0 ? '+' : ''}€{netSavings}. Balance: €{userData.balance}.
              </p>
              <p className="mt-2 text-green-600 font-medium">
                {currentTip === 'save' ? generateSaveTip() : generateEarnTip()}
              </p>
            </div>
          </div>
        </Card>

        {/* Financial Summary */}
        <Card className="p-6 bg-white shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            📊 30-Day Summary
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Income</p>
              <p className="text-lg font-bold text-green-600">€{totalIncome}</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Target className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Balance</p>
              <p className="text-lg font-bold text-blue-600">€{userData.balance}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Top Spending Categories:</p>
            {topCategories.map(([category, amount], index) => (
              <div key={category} className="flex justify-between items-center py-2">
                <span className="text-gray-700">{index + 1}. {category}</span>
                <span className="font-semibold text-red-500">€{amount}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
            <span className="text-gray-700">Net Savings:</span>
            <span className={`font-bold ${netSavings >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {netSavings >= 0 ? '+' : ''}€{netSavings}
            </span>
          </div>
        </Card>

        {/* Streak & Opportunities */}
        <Card className="p-6 bg-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">🔥 Streak: {userData.streak} days</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentTip(currentTip === 'save' ? 'earn' : 'save')}
            >
              Switch to {currentTip === 'save' ? 'Earn' : 'Save'} Tips
            </Button>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700">💡 Opportunity Highlights:</h4>
            <div className="space-y-2">
              <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-l-purple-500">
                <p className="text-sm">🎨 Your graphic design skills could earn €200/week on freelance platforms!</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-l-yellow-500">
                <p className="text-sm">✍️ Copywriting gigs average €40/hour for your experience level</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                <p className="text-sm">💰 Cut dining expenses by 30% = €50 extra savings this month</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Budget Pods */}
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Budget Pods
          </h3>
          
          {userData.pods.map((pod, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-blue-800">{pod.name}</h4>
                <span className="text-sm text-blue-600">{pod.members.length} members</span>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Members: {pod.members.join(', ')}
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Add Shared Expense
              </Button>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-4">
            <Users className="h-4 w-4 mr-2" />
            Create New Pod
          </Button>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">⚡ Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-green-600 hover:bg-green-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Log Income
            </Button>
            <Button variant="outline">
              <TrendingDown className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
            <Button variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              Get Earn Tip
            </Button>
            <Button variant="outline">
              <Coffee className="h-4 w-4 mr-2" />
              Save Challenge
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BudgetDashboard;
