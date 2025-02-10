import React from 'react';
import { Play, Pause, Settings, TrendingUp, TrendingDown } from 'lucide-react';


const mockCampaigns = [
  {
    id: 1,
    name: 'Summer Collection Promotion',
    channel: 'amazon',
    status: 'active',
    budget: 2500,
    spent: 1800,
    roas: 4.2,
    impressions: 45000,
    clicks: 3800,
    trend: 'up'
  },
  {
    id: 2,
    name: 'Website Retargeting',
    channel: 'ecommerce',
    status: 'active',
    budget: 1500,
    spent: 900,
    roas: 3.1,
    impressions: 28000,
    clicks: 2200,
    trend: 'down'
  },
  {
    id: 3,
    name: 'TikTok Brand Awareness',
    channel: 'tiktok',
    status: 'paused',
    budget: 1000,
    spent: 400,
    roas: 2.8,
    impressions: 35000,
    clicks: 2800,
    trend: 'up'
  }
];

export default function CampaignList({ channels }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active Campaigns</h2>
          <button className="px-4 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
            Create Campaign
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
              <th className="px-6 py-4 font-medium">Campaign</th>
              <th className="px-6 py-4 font-medium">Channel</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Budget</th>
              <th className="px-6 py-4 font-medium">Spent</th>
              <th className="px-6 py-4 font-medium">ROAS</th>
              <th className="px-6 py-4 font-medium">Performance</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockCampaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{campaign.name}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="capitalize">{campaign.channel}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    campaign.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4">${campaign.budget.toLocaleString()}</td>
                <td className="px-6 py-4">${campaign.spent.toLocaleString()}</td>
                <td className="px-6 py-4">{campaign.roas}x</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {campaign.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={campaign.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {campaign.trend === 'up' ? '+12%' : '-8%'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-400 hover:text-primary-600">
                      {campaign.status === 'active' ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                    <button className="text-gray-400 hover:text-primary-600">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}