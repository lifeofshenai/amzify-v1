import React from "react";
import { Store, ShoppingBag, Globe, TrendingUp, Users, DollarSign, Star, Package } from "lucide-react";
import { useAmazonMetrics } from "../hooks/useAmazonMetrics";
import { useMarketplaceMetrics } from "../hooks/useMarketplaceMetrics";
import ErrorBoundary from "../components/dashboard/ErrorBoundary";
import ChannelCard from "../components/sales/ChannelCard";
import MetricCard from "../components/sales/MetricCard";
import ChannelPerformance from "../components/sales/ChannelPerformance";
import SalesDistribution from "../components/sales/SalesDistribution";
import IntegrationSetup from "../components/onboarding/IntegrationSetup";
import { useVendorStore } from "../stores/vendorStore";
import ComingSoon from "./component";
const channelMetrics = {
  amazon: {
    sales: 75000,
    orders: 1250,
    conversion: 3.2,
    traffic: 45000,
  },
  ecommerce: {
    sales: 50000,
    orders: 830,
    conversion: 2.5,
    traffic: 40000,
  },
  tiktok: {
    sales: 25000,
    orders: 420,
    conversion: 2.5,
    traffic: 35000,
  },
};

export default function SalesChannels() {
  const { integrations } = useVendorStore();
  const isIntegrated = Object.values(integrations).some((integration) => integration?.connected);
  const { metrics: amazonMetrics, isLoading: amazonLoading, error: amazonError } = useAmazonMetrics("your-brand-id");
  const {
    ecommerceMetrics,
    tiktokMetrics,
    isLoading: marketplaceLoading,
    error: marketplaceError,
  } = useMarketplaceMetrics("your-brand-id");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-400">Sales Channels</h1>
        {/* <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
            Add New Channel
          </button>
        </div> */}
      </div>
      <ComingSoon />

      {/* {!isIntegrated && (
        <div className="mb-8">
          <IntegrationSetup />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChannelCard title="Amazon" icon={<ShoppingBag className="w-6 h-6" />} metrics={channelMetrics.amazon} />
        <ChannelCard title="E-commerce" icon={<Globe className="w-6 h-6" />} metrics={channelMetrics.ecommerce} />
        <ChannelCard title="TikTok Shop" icon={<Store className="w-6 h-6" />} metrics={channelMetrics.tiktok} />
      </div> */}

      {/* Rest of the component remains the same */}
    </div>
  );
}
