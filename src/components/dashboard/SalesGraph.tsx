import React, { useState } from 'react';
import { useMetricsStore } from '../../stores/metricsStore';

type TimeRange = 'YTD' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | '1M' | '3M';

interface DataPoint {
  date: string;
  value: number;
}

const generateMockData = (timeRange: TimeRange): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();
  let startDate = new Date();
  let points = 30;

  switch (timeRange) {
    case 'YTD':
      startDate = new Date(now.getFullYear(), 0, 1);
      points = Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      break;
    case 'Q1':
      startDate = new Date(now.getFullYear(), 0, 1);
      points = 90;
      break;
    case 'Q2':
      startDate = new Date(now.getFullYear(), 3, 1);
      points = 90;
      break;
    case 'Q3':
      startDate = new Date(now.getFullYear(), 6, 1);
      points = 90;
      break;
    case 'Q4':
      startDate = new Date(now.getFullYear(), 9, 1);
      points = 90;
      break;
    case '1M':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      points = 30;
      break;
    case '3M':
      startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      points = 90;
      break;
  }

  const baseValue = 50000;
  const variance = 10000;

  for (let i = 0; i < points; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const randomValue = baseValue + (Math.random() * variance * 2 - variance);
    const trendMultiplier = 1 + (i / points) * 0.5; // Upward trend
    
    data.push({
      date: currentDate.toISOString().split('T')[0],
      value: Math.round(randomValue * trendMultiplier)
    });
  }

  return data;
};

export default function SalesGraph() {
  const [timeRange, setTimeRange] = useState<TimeRange>('YTD');
  const data = generateMockData(timeRange);
  const { getTotal } = useMetricsStore();
  const { totalRevenue } = getTotal();

  const timeRanges: { label: string; value: TimeRange }[] = [
    { label: 'Year to Date', value: 'YTD' },
    { label: 'Q1', value: 'Q1' },
    { label: 'Q2', value: 'Q2' },
    { label: 'Q3', value: 'Q3' },
    { label: 'Q4', value: 'Q4' },
    { label: 'Last Month', value: '1M' },
    { label: 'Last 3 Months', value: '3M' }
  ];

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Income Overview</h3>
          <p className="text-sm text-gray-500 mt-1">
            Total Income: {formatCurrency(totalRevenue)}
          </p>
        </div>
        <div className="flex space-x-2">
          {timeRanges.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setTimeRange(value)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                timeRange === value
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full bg-gray-50 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Graph visualization removed for simplicity</p>
      </div>
    </div>
  );
}