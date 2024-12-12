import React from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

interface ChannelMetrics {
  budget: number;
  spent: number;
  roas: number;
  clicks: number;
  impressions: number;
  ctr: number;
  acos: number;
}

interface ChannelPerformanceProps {
  channels: Record<string, ChannelMetrics>;
}

export default function ChannelPerformance({ channels }: ChannelPerformanceProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-6">Channel Performance</h2>
      <div className="space-y-6">
        {Object.entries(channels).map(([channel, metrics]) => (
          <div key={channel} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 capitalize">{channel}</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  ROAS: <span className="font-medium text-green-600">{metrics.roas}x</span>
                </span>
                <span className="text-sm text-gray-600">
                  ACOS: <span className="font-medium">{metrics.acos}%</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Budget</span>
                  <span className="text-sm font-medium">${metrics.budget.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full"
                    style={{ width: `${(metrics.spent / metrics.budget) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Spent: ${metrics.spent.toLocaleString()}</span>
                  <span>Remaining: ${(metrics.budget - metrics.spent).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-xs text-gray-500">Clicks</span>
                  <p className="text-sm font-medium">{metrics.clicks.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">CTR</span>
                  <p className="text-sm font-medium">{metrics.ctr}%</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Impressions</span>
                  <p className="text-sm font-medium">{metrics.impressions.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Spent</span>
                  <p className="text-sm font-medium">${metrics.spent.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}