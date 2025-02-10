import React from 'react';

export default function MetricCard({ title, value, icon, trend, percentage }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 text-sm">{title}</span>
        <div className="p-2 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-semibold">
          {typeof value === 'number' ? `$${value.toLocaleString()}` : value}
        </p>
        {percentage !== undefined && (
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
        {trend !== undefined && (
          <p className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}% vs last month
          </p>
        )}
      </div>
    </div>
  );
}