import React from 'react';
import { TrendingDown } from 'lucide-react';
import { useMetricsStore } from '../../stores/metricsStore';

interface ExpenseBreakdownProps {
  totalCogs: number;
}

export default function ExpenseBreakdown({ totalCogs }: ExpenseBreakdownProps) {
  const { getTotal, expenses } = useMetricsStore();
  const { totalRevenue, totalCost, grossProfit, netProfit } = getTotal();
  const grossMargin = ((grossProfit / totalRevenue) * 100).toFixed(1);
  const netMargin = ((netProfit / totalRevenue) * 100).toFixed(1);

  // All expenses combined
  const allExpenses = [
    { label: 'Cost of Goods Sold', value: totalCogs },
    { label: 'Shipping', value: expenses.shipping },
    { label: 'Ad Spend', value: expenses.adSpend },
    { label: 'Management Compensation', value: expenses.managementCompensation },
    { label: 'Software', value: expenses.software }
  ].sort((a, b) => a.label.localeCompare(b.label));

  const totalExpenses = allExpenses.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-primary-200 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Expense Breakdown</h3>
        <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg">
          <TrendingDown className="w-5 h-5 text-primary-600" />
        </div>
      </div>

      <div className="space-y-3">
        {allExpenses.map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-medium text-gray-900">
              ${item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-gray-900">Total Expenses</span>
          <span className="text-sm font-semibold text-gray-900">
            ${totalExpenses.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Profit Section */}
      <div className="pt-4 border-t border-gray-200 space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Gross Profit</span>
          <span className="font-medium text-green-600">
            ${grossProfit.toLocaleString()} ({grossMargin}%)
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Net Profit</span>
          <span className="font-medium text-primary-600">
            ${netProfit.toLocaleString()} ({netMargin}%)
          </span>
        </div>
      </div>
    </div>
  );
}