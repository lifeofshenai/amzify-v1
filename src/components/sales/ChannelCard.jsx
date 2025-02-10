import React from 'react';

export default function ChannelCard({ title, icon, metrics, hasBreakdown }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Sales</span>
          <span className="text-sm font-medium">${metrics.sales.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Orders</span>
          <span className="text-sm font-medium">{metrics.orders.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Conversion Rate</span>
          <span className="text-sm font-medium">{metrics.conversion}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Traffic</span>
          <span className="text-sm font-medium">{metrics.traffic.toLocaleString()}</span>
        </div>

        {hasBreakdown && metrics.breakdown && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Channel Breakdown</h4>
            <div className="space-y-3">
              {Object.entries(metrics.breakdown).map(([channel, data]) => (
                <div key={channel} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 capitalize">{channel}</span>
                    <span className="text-sm font-medium">${data.sales.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 rounded-full"
                      style={{ width: `${(data.sales / metrics.sales) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}