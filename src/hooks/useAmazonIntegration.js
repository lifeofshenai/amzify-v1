import { useState, useEffect } from 'react';
import { AmazonClient } from '../services/marketplace/amazonClient';
import { marketplaceConfig } from '../config/marketplace';

export function useAmazonIntegration() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateConnection = async () => {
      try {
        const client = new AmazonClient(marketplaceConfig.amazon);
        const isValid = await client.validateCredentials();
        setIsConnected(isValid);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to validate Amazon connection');
      } finally {
        setIsLoading(false);
      }
    };

    validateConnection();
  }, []);

  const connectAmazonAccount = async (credentials) => {
    try {
      setIsLoading(true);
      const client = new AmazonClient({
        ...marketplaceConfig.amazon,
        ...credentials,
      });
      
      const isValid = await client.validateCredentials();
      if (!isValid) {
        throw new Error('Invalid Amazon credentials');
      }
      
      setIsConnected(true);
      setError(null);
      
      // In a real implementation, you would save these credentials securely
      // through your backend API
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect Amazon account');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isConnected,
    isLoading,
    error,
    connectAmazonAccount,
  };
}