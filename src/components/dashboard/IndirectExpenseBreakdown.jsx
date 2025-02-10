import React from 'react';
import { TrendingDown } from 'lucide-react';

export default function IndirectExpenseBreakdown({ expenses }) {
  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
  const getPercentage = (value) => ((value / totalExpenses) * 100).toFixed(1);

  const expenseItems = [
    { label: 'Ad Spend', value: expenses.adSpend },
    { label: 'Management Compensation', value: expenses.managementCompensation },
    { label: 'Software', value: expenses.software }
  ].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-primary-200 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Indirect Expense Breakdown</h3>
        <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg">
          <TrendingDown className="w-5 h-5 text-primary-600" />
        </div>
      </div>

      <div className="space-y-4">
        {expenseItems.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{item.label}</span>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900">${item.value.toLocaleString()}</span>
                <span className="text-xs text-gray-500 ml-2">({getPercentage(item.value)}%)</span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full"
                style={{ width: `${getPercentage(item.value)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900">Total Indirect Expenses</span>
          <span className="text-sm font-medium text-gray-900">
            ${totalExpenses.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}