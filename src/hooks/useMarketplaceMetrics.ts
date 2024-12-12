import { useState, useEffect } from 'react';
import { MockMetricsService } from '../services/marketplace/mockMetricsService';
import type { EcommerceMetrics, TikTokMetrics } from '../services/marketplace/types';

const metricsService = new MockMetricsService();

export function useMarketplaceMetrics(brandId: string) {
  const [ecommerceMetrics, setEcommerceMetrics] = useState<EcommerceMetrics | null>(null);
  const [tiktokMetrics, setTiktokMetrics] = useState<TikTokMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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