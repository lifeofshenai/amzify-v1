import React, { useState } from 'react';
import { useAmazonIntegration } from '../../hooks/useAmazonIntegration';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function AmazonIntegration() {
  const { isConnected, isLoading, error, connectAmazonAccount } = useAmazonIntegration();
  const [credentials, setCredentials] = useState({
    accessKey: '',
    secretKey: '',
    refreshToken: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await connectAmazonAccount(credentials);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
        <span className="ml-2">Checking Amazon connection...</span>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="p-6 bg-green-50 rounded-lg">
        <div className="flex items-center">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <span className="ml-2 text-green-700">Connected to Amazon Seller Account</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 rounded-lg flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Access Key
          </label>
          <input
            type="text"
            value={credentials.accessKey}
            onChange={(e) => setCredentials(prev => ({ ...prev, accessKey: e.target.value }))}
            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secret Key
          </label>
          <input
            type="password"
            value={credentials.secretKey}
            onChange={(e) => setCredentials(prev => ({ ...prev, secretKey: e.target.value }))}
            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Refresh Token
          </label>
          <input
            type="password"
            value={credentials.refreshToken}
            onChange={(e) => setCredentials(prev => ({ ...prev, refreshToken: e.target.value }))}
            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
        >
          Connect Amazon Account
        </button>
      </form>
    </div>
  );
}