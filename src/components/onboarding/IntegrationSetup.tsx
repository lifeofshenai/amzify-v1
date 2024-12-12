import React, { useState } from 'react';
import { useVendorStore } from '../../stores/vendorStore';
import { useOnboardingStore } from '../../stores/onboardingStore';
import { Loader2, AlertCircle } from 'lucide-react';
import SalesChannelIcon from '../common/SalesChannelIcon';
import toast from 'react-hot-toast';

export default function IntegrationSetup() {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [showSkipWarning, setShowSkipWarning] = useState(false);
  const { integrations, setIntegration, setOnboarded } = useVendorStore();
  const { completeStep } = useOnboardingStore();

  const handleConnect = async (platform: 'amazon' | 'shopify' | 'tiktok') => {
    setIsConnecting(platform);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIntegration(platform, {
        connected: true,
        [platform === 'amazon' ? 'sellerId' : platform === 'shopify' ? 'shopUrl' : 'shopId']: 'mock-id'
      });
      
      toast.success(`Connected to ${platform} successfully!`);
    } catch (error) {
      toast.error(`Failed to connect to ${platform}`);
    } finally {
      setIsConnecting(null);
    }
  };

  const handleComplete = () => {
    completeStep('sales-channels');
    setOnboarded(true);
  };

  if (showSkipWarning) {
    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-yellow-800">Skip Sales Channel Setup?</h3>
              <p className="mt-2 text-sm text-yellow-700">
                You can still use the platform without connecting your sales channels now, but you'll need to set them up later to:
              </p>
              <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside space-y-1">
                <li>Sync your inventory across platforms</li>
                <li>Manage orders from one dashboard</li>
                <li>Track performance metrics</li>
                <li>Optimize your advertising campaigns</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => setShowSkipWarning(false)}
              className="flex-1 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
            >
              Go Back
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Skip Anyway
            </button>
          </div>
        </div>
      </div>
    );
  }

  const platforms = [
    {
      id: 'amazon',
      name: 'Amazon',
      description: 'Connect your Amazon Seller Central account',
      icon: 'amazon'
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Connect your Shopify store',
      icon: 'ecommerce'
    },
    {
      id: 'tiktok',
      name: 'TikTok Shop',
      description: 'Connect your TikTok Shop account',
      icon: 'tiktok'
    }
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Connect Your Sales Channels</h2>
        <p className="mt-1 text-sm text-gray-500">
          Connect your existing sales channels or set up new ones to manage everything from one place.
        </p>
      </div>

      <div className="grid gap-6">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <SalesChannelIcon channel={platform.icon} size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{platform.name}</h3>
                  <p className="text-sm text-gray-500">{platform.description}</p>
                </div>
              </div>
              
              <button
                onClick={() => handleConnect(platform.id)}
                disabled={isConnecting !== null || integrations[platform.id]?.connected}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  integrations[platform.id]?.connected
                    ? 'bg-green-50 text-green-700'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isConnecting === platform.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : integrations[platform.id]?.connected ? (
                  'Connected'
                ) : (
                  'Connect'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 flex space-x-4">
        <button
          onClick={() => setShowSkipWarning(true)}
          className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Skip for now
        </button>
        <button
          onClick={handleComplete}
          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
}