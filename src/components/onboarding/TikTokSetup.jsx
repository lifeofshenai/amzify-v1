import React, { useState } from 'react';
import { useVendorStore } from '../../stores/vendorStore';
import { Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TikTokSetup() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { setIntegration } = useVendorStore();
  const [credentials, setCredentials] = useState({
    appKey: '',
    appSecret: '',
    accessToken: ''
  });

  const handleConnect = async (e) => {
    e.preventDefault();
    setIsConnecting(true);
    try {
      // In a real app, this would validate credentials with TikTok Shop API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIntegration('tiktok', {
        connected: true,
        shopId: 'mock-shop-id'
      });
      
      toast.success('Connected to TikTok Shop successfully!');
    } catch (error) {
      toast.error('Failed to connect to TikTok Shop');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Connect TikTok Shop</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter your TikTok Shop API credentials to connect your account.
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium">New to TikTok Shop?</p>
          <p className="mt-1">
            We can help you set up a new TikTok Shop account and guide you through the process.
          </p>
        </div>
      </div>

      <form onSubmit={handleConnect} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">App Key</label>
            <input
              type="text"
              value={credentials.appKey}
              onChange={(e) => setCredentials(prev => ({ ...prev, appKey: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">App Secret</label>
            <input
              type="password"
              value={credentials.appSecret}
              onChange={(e) => setCredentials(prev => ({ ...prev, appSecret: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Access Token</label>
            <input
              type="password"
              value={credentials.accessToken}
              onChange={(e) => setCredentials(prev => ({ ...prev, accessToken: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isConnecting}
          className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Connecting...
            </>
          ) : (
            'Connect TikTok Shop'
          )}
        </button>
      </form>
    </div>
  );
}