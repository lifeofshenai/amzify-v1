import React from 'react';
import { TrendingUp } from 'lucide-react';

interface RevenueBreakdownProps {
  revenue: {
    amazon: number;
    ecommerce: number;
    tiktok: number;
  };
}

export default function RevenueBreakdown({ revenue }: RevenueBreakdownProps) {
  const totalRevenue = Object.values(revenue).reduce((sum, val) => sum + val, 0);
  const getPercentage = (value: number) => ((value / totalRevenue) * 100).toFixed(1);

  const revenueItems = [
    { label: 'Amazon', value: revenue.amazon },
    { label: 'E-commerce', value: revenue.ecommerce },
    { label: 'TikTok', value: revenue.tiktok }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-primary-200 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Income Breakdown</h3>
        <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg">
          <TrendingUp className="w-5 h-5 text-primary-600" />
        </div>
      </div>

      <div className="space-y-4">
        {revenueItems.map((item) => (
          <RevenueItem
            key={item.label}
            label={item.label}
            value={item.value}
            percentage={parseFloat(getPercentage(item.value))}
          />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900">Total Income</span>
          <span className="text-sm font-medium text-gray-900">
            ${totalRevenue.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

interface RevenueItemProps {
  label: string;
  value: number;
  percentage: number;
}

function RevenueItem({ label, value, percentage }: RevenueItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{label}</span>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-900">${value.toLocaleString()}</span>
          <span className="text-xs text-gray-500 ml-2">({percentage}%)</span>
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}