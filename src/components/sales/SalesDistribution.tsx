import React from 'react';

interface SalesDistributionProps {
  channel: string;
  sales: number;
  totalSales: number;
  breakdown?: {
    shopify?: {
      sales: number;
      orders: number;
      conversion: number;
    };
    website?: {
      sales: number;
      orders: number;
      conversion: number;
    };
  };
}

export default function SalesDistribution({ 
  channel, 
  sales, 
  totalSales,
  breakdown 
}: SalesDistributionProps) {
  const percentage = (sales / totalSales) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-900 capitalize">{channel}</span>
        <span className="text-sm font-medium">${sales.toLocaleString()} ({percentage.toFixed(1)}%)</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {breakdown && (
        <div className="ml-4 mt-2 space-y-2">
          {Object.entries(breakdown).map(([subChannel, data]) => {
            const subPercentage = (data.sales / sales) * 100;
            return (
              <div key={subChannel} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 capitalize">{subChannel}</span>
                  <span className="text-xs font-medium">
                    ${data.sales.toLocaleString()} ({subPercentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary-500 rounded-full"
                    style={{ width: `${subPercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}