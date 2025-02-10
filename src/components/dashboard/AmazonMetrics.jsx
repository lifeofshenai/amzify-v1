import React from 'react';
import { TrendingUp, Package, Star, DollarSign } from 'lucide-react';

export default function AmazonMetrics({ metrics }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Amazon Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Sales"
          value={`$${metrics.sales.monthly.toLocaleString()}`}
          trend={+15}
          icon={<DollarSign className="w-6 h-6 text-primary-600" />}
        />
        <MetricCard
          title="Inventory Health"
          value={`${metrics.inventory.inStock} Units`}
          subtitle={`${metrics.inventory.lowStock} Low Stock`}
          icon={<Package className="w-6 h-6 text-primary-600" />}
        />
        <MetricCard
          title="ACOS"
          value={`${metrics.advertising.acos}%`}
          subtitle={`ROAS: ${metrics.advertising.roas}x`}
          icon={<TrendingUp className="w-6 h-6 text-primary-600" />}
        />
        <MetricCard
          title="Customer Feedback"
          value={metrics.performance.customerFeedback.toFixed(1)}
          subtitle="Out of 5.0"
          icon={<Star className="w-6 h-6 text-primary-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <PerformanceMetric
              label="Order Defect Rate"
              value={metrics.performance.orderDefectRate}
              target={1}
            />
            <PerformanceMetric
              label="Late Shipment Rate"
              value={metrics.performance.lateShipmentRate}
              target={4}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Advertising Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Spend</span>
              <span className="font-semibold">${metrics.advertising.spend.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Impressions</span>
              <span className="font-semibold">{metrics.advertising.impressions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Clicks</span>
              <span className="font-semibold">{metrics.advertising.clicks.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, subtitle, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 text-sm">{title}</span>
        <div className="p-3 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-semibold">{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        {trend && (
          <p className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}% vs last month
          </p>
        )}
      </div>
    </div>
  );
}

function PerformanceMetric({ label, value, target }) {
  const percentage = (value / target) * 100;
  const isGood = value <= target;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{label}</span>
        <span className={`text-sm font-medium ${isGood ? 'text-green-600' : 'text-red-600'}`}>
          {value}% / {target}%
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${isGood ? 'bg-green-500' : 'bg-red-500'}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}