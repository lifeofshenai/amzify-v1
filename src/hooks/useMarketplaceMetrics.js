import { useState, useEffect } from 'react';
import { MockMetricsService } from '../services/marketplace/mockMetricsService';

const metricsService = new MockMetricsService();

export function useMarketplaceMetrics(brandId) {
  const [ecommerceMetrics, setEcommerceMetrics] = useState(null);
  const [tiktokMetrics, setTiktokMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const [ecommerce, tiktok] = await Promise.all([
          metricsService.getEcommerceMetrics(brandId),
          metricsService.getTikTokMetrics(brandId)
        ]);

        setEcommerceMetrics(ecommerce);
        setTiktokMetrics(tiktok);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
        console.error('Failed to fetch marketplace metrics:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [brandId]);

  return {
    ecommerceMetrics,
    tiktokMetrics,
    isLoading,
    error
  };
}