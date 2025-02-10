import React, { useState } from 'react';
// import { useVendorStore } from '../../stores/vendorStore';
import { Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AmazonSetup() {
  const [isConnecting, setIsConnecting] = useState(false);
  // const { setIntegration } = useVendorStore();
  const [credentials, setCredentials] = useState({
    accessKey: '',
    secretKey: '',
    refreshToken: '',
    roleArn: '',
    marketplaceId: ''
  });

  const handleConnect = async (e) => {
    e.preventDefault();
    setIsConnecting(true);
    try {
      // In a real app, this would validate credentials with Amazon SP-API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // setIntegration('amazon', {
      //   connected: true,
      //   sellerId: 'mock-seller-id',
      //   marketplaceId: credentials.marketplaceId
      // });
      
      toast.success('Connected to Amazon successfully!');
    } catch (error) {
      toast.error('Failed to connect to Amazon');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Connect Amazon Seller Central</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter your Amazon Seller Central API credentials to connect your account.
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium">Need help finding your credentials?</p>
          <p className="mt-1">
            Follow our step-by-step guide to locate your Amazon Seller Central API credentials.
          </p>
        </div>
      </div>

      <form onSubmit={handleConnect} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Access Key</label>
            <input
              type="text"
              value={credentials.accessKey}
              onChange={(e) => setCredentials(prev => ({ ...prev, accessKey: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Secret Key</label>
            <input
              type="password"
              value={credentials.secretKey}
              onChange={(e) => setCredentials(prev => ({ ...prev, secretKey: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Refresh Token</label>
            <input
              type="password"
              value={credentials.refreshToken}
              onChange={(e) => setCredentials(prev => ({ ...prev, refreshToken: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role ARN</label>
            <input
              type="text"
              value={credentials.roleArn}
              onChange={(e) => setCredentials(prev => ({ ...prev, roleArn: e.target.value }))}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Marketplace ID</label>
            <input
              type="text"
              value={credentials.marketplaceId}
              onChange={(e) => setCredentials(prev => ({ ...prev, marketplaceId: e.target.value }))}
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
            'Connect Amazon Account'
          )}
        </button>
      </form>
    </div>
  );
}