import React from 'react';
import { ShoppingBag, Globe, TrendingUp, Users, Share2, Eye, BarChart3 } from 'lucide-react';
import type { EcommerceMetrics, TikTokMetrics } from '../../services/marketplace/types';

interface MarketplaceMetricsProps {
  ecommerceMetrics: EcommerceMetrics;
  tiktokMetrics: TikTokMetrics;
}

export default function MarketplaceMetrics({
  ecommerceMetrics,
  tiktokMetrics
}: MarketplaceMetricsProps) {
  return (
    <div className="space-y-8">
      <EcommerceSection metrics={ecommerceMetrics} />
      <TikTokSection metrics={tiktokMetrics} />
    </div>
  );
}

function EcommerceSection({ metrics }: { metrics: EcommerceMetrics }) {
  const totalRevenue = metrics.channels.shopify.revenue + metrics.channels.website.revenue;
  const totalOrders = metrics.channels.shopify.orders + metrics.channels.website.orders;
  const avgConversion = (metrics.channels.shopify.conversion + metrics.channels.website.conversion) / 2;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center">
        <Globe className="w-6 h-6 mr-2 text-primary-600" />
        E-commerce Performance
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          trend={12}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <MetricCard
          title="Total Orders"
          value={totalOrders.toLocaleString()}
          trend={8.5}
          icon={<ShoppingBag className="w-5 h-5" />}
        />
        <MetricCard
          title="Avg. Conversion"
          value={`${avgConversion.toFixed(1)}%`}
          trend={0.5}
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2 text-primary-600" />
            Shopify Channel
          </h3>
          <div className="space-y-4">
            <ChannelMetric
              label="Revenue"
              value={`$${metrics.channels.shopify.revenue.toLocaleString()}`}
              percentage={(metrics.channels.shopify.revenue / totalRevenue) * 100}
            />
            <ChannelMetric
              label="Orders"
              value={metrics.channels.shopify.orders.toLocaleString()}
              percentage={(metrics.channels.shopify.orders / totalOrders) * 100}
            />
            <ChannelMetric
              label="Conversion"
              value={`${metrics.channels.shopify.conversion}%`}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-primary-600" />
            Website Channel
          </h3>
          <div className="space-y-4">
            <ChannelMetric
              label="Revenue"
              value={`$${metrics.channels.website.revenue.toLocaleString()}`}
              percentage={(metrics.channels.website.revenue / totalRevenue) * 100}
            />
            <ChannelMetric
              label="Orders"
              value={metrics.channels.website.orders.toLocaleString()}
              percentage={(metrics.channels.website.orders / totalOrders) * 100}
            />
            <ChannelMetric
              label="Conversion"
              value={`${metrics.channels.website.conversion}%`}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
            SEO Performance
          </h3>
          <div className="space-y-4">
            <MetricRow
              label="Organic Traffic"
              value={metrics.seo.organicTraffic.toLocaleString()}
            />
            <MetricRow
              label="Avg. Position"
              value={metrics.seo.averagePosition.toFixed(1)}
            />
            <MetricRow
              label="Click Through Rate"
              value={`${metrics.seo.clickThroughRate}%`}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2 text-primary-600" />
            Inventory Status
          </h3>
          <div className="space-y-4">
            <MetricRow
              label="In Stock"
              value={metrics.inventory.inStock.toLocaleString()}
              className="text-green-600"
            />
            <MetricRow
              label="Low Stock"
              value={metrics.inventory.lowStock.toLocaleString()}
              className="text-yellow-600"
            />
            <MetricRow
              label="Out of Stock"
              value={metrics.inventory.outOfStock.toLocaleString()}
              className="text-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TikTokSection({ metrics }: { metrics: TikTokMetrics }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center">
        <Share2 className="w-6 h-6 mr-2 text-primary-600" />
        TikTok Performance
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Video Views"
          value={metrics.videoPerformance.views.toLocaleString()}
          trend={18.2}
          icon={<Eye className="w-5 h-5" />}
        />
        <MetricCard
          title="Completion Rate"
          value={`${metrics.videoPerformance.completionRate}%`}
          trend={5.5}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <MetricCard
          title="Engagement"
          value={metrics.engagement.likes.toLocaleString()}
          subtitle={`${metrics.engagement.shares.toLocaleString()} Shares`}
          icon={<Share2 className="w-5 h-5" />}
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  subtitle?: string;
  icon: React.ReactNode;
}

function MetricCard({ title, value, trend, subtitle, icon }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 text-sm">{title}</span>
        <div className="p-2 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-semibold">{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        {trend !== undefined && (
          <p className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}% vs last month
          </p>
        )}
      </div>
    </div>
  );
}

interface ChannelMetricProps {
  label: string;
  value: string;
  percentage?: number;
}

function ChannelMetric({ label, value, percentage }: ChannelMetricProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium text-gray-900">{value}</span>
      </div>
      {percentage !== undefined && (
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}

interface MetricRowProps {
  label: string;
  value: string | number;
  className?: string;
}

function MetricRow({ label, value, className = 'text-gray-900' }: MetricRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm font-medium ${className}`}>{value}</span>
    </div>
  );
}