import React, { useState } from "react";
import { DollarSign, TrendingUp, Target, BarChart3, Plus, Settings } from "lucide-react";
import AdBudgetManager from "../components/advertising/AdBudgetManager";
import ChannelPerformance from "../components/advertising/ChannelPerformance";
import CampaignList from "../components/advertising/CampaignList";
import AIRecommendations from "../components/advertising/AIRecommendations";
import ComingSoon from "./component";

const adMetrics = {
  totalBudget: 10000,
  spent: 7500,
  remaining: 2500,
  roi: 3.2,
  channels: {
    amazon: {
      budget: 5000,
      spent: 4200,
      roas: 3.8,
      clicks: 12500,
      impressions: 150000,
      ctr: 8.33,
      acos: 15.2,
    },
    ecommerce: {
      budget: 3000,
      spent: 2300,
      roas: 2.9,
      clicks: 8500,
      impressions: 95000,
      ctr: 8.95,
      acos: 18.5,
    },
    tiktok: {
      budget: 2000,
      spent: 1000,
      roas: 2.5,
      clicks: 6200,
      impressions: 85000,
      ctr: 7.29,
      acos: 22.1,
    },
  },
};

export default function Advertising() {
  const [showBudgetManager, setShowBudgetManager] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-400">Advertising</h1>
        {/* <div className="flex space-x-2">
          <button
            onClick={() => setShowBudgetManager(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Funds
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5" />
          </button>
        </div> */}
      </div>
      <ComingSoon />

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Budget" value={adMetrics.totalBudget} icon={<DollarSign className="w-6 h-6" />} />
        <MetricCard
          title="Spent"
          value={adMetrics.spent}
          percentage={(adMetrics.spent / adMetrics.totalBudget) * 100}
          icon={<BarChart3 className="w-6 h-6" />}
        />
        <MetricCard title="Remaining" value={adMetrics.remaining} icon={<Target className="w-6 h-6" />} />
        <MetricCard title="ROI" value={`${adMetrics.roi}x`} trend={0.5} icon={<TrendingUp className="w-6 h-6" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChannelPerformance channels={adMetrics.channels} />
        <AIRecommendations channels={adMetrics.channels} />
      </div>

      <CampaignList channels={adMetrics.channels} />

      {showBudgetManager && (
        <AdBudgetManager
          currentBudget={adMetrics.totalBudget}
          onClose={() => setShowBudgetManager(false)}
          onAddFunds={(amount) => {
            console.log("Adding funds:", amount);
            setShowBudgetManager(false);
          }}
        />
      )} */}
    </div>
  );
}

function MetricCard({ title, value, icon, trend, percentage }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 text-sm">{title}</span>
        <div className="p-2 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg">{icon}</div>
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-semibold">{typeof value === "number" ? `$${value.toLocaleString()}` : value}</p>
        {percentage !== undefined && (
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary-600 rounded-full" style={{ width: `${percentage}%` }} />
          </div>
        )}
        {trend !== undefined && (
          <p className={`text-sm ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
            {trend > 0 ? "+" : ""}
            {trend}% vs last month
          </p>
        )}
      </div>
    </div>
  );
}
