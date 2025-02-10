import React from 'react';
import { DollarSign } from 'lucide-react';
// import { useMetricsStore } from '../../stores/metricsStore';

export default function CostBreakdown({ totalCogs }) {
  // const { getTotal, expenses } = useMetricsStore();
  // const { totalRevenue, totalCost, grossProfit } = getTotal();
  // const grossMargin = ((grossProfit / totalRevenue) * 100).toFixed(1);

  const costItems = [
    { label: 'Cost of Goods Sold', value: totalCogs },
    { label: 'Shipping', value: expenses?.shipping }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-primary-200 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Cost of Goods Breakdown</h3>
        <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg">
          <DollarSign className="w-5 h-5 text-primary-600" />
        </div>
      </div>

      <div className="space-y-4">
        {costItems.map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-medium text-gray-900">
              ${item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-900">Total Cost</span>
          <span className="text-sm font-medium text-gray-900">
            ${totalCost.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Gross Profit</span>
          <span className="font-medium text-green-600">
            ${grossProfit.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Gross Margin</span>
          <span className="font-medium text-primary-600">
            {grossMargin}%
          </span>
        </div>
      </div>
    </div>
  );
}