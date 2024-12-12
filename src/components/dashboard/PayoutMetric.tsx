import React from 'react';
import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMetricsStore } from '../../stores/metricsStore';

export default function PayoutMetric() {
  const { getTotal } = useMetricsStore();
  const { totalRevenue, totalCost, totalExpenses } = getTotal();
  const totalPayout = totalRevenue - totalCost - totalExpenses;
  const payoutPercentage = ((totalPayout / totalRevenue) * 100).toFixed(1);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-primary-200 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Total Payout</p>
          <h3 className="text-2xl font-semibold mt-1 text-gray-900">${totalPayout.toLocaleString()}</h3>
        </div>
        <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg">
          <Wallet className="w-6 h-6 text-primary-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className="text-primary-600 font-medium">{payoutPercentage}% of revenue</span>
        <span className="text-gray-600 ml-2">available for payout</span>
      </div>
    </div>
  );
}