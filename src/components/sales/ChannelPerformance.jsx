import React from 'react';

export default function ChannelPerformance({ channel, metrics }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-900 capitalize">{channel}</span>
        <span className="text-sm font-medium">${metrics.sales.toLocaleString()}</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <span className="text-xs text-gray-500">Orders</span>
          <p className="text-sm font-medium">{metrics.orders}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Conversion</span>
          <p className="text-sm font-medium">{metrics.conversion}%</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Traffic</span>
          <p className="text-sm font-medium">{metrics.traffic}</p>
        </div>
      </div>
    </div>
  );
}