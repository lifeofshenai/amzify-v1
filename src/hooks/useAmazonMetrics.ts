import { useState, useEffect } from 'react';
import { MockMetricsService } from '../services/marketplace/mockMetrics';
import type { BrandMetrics } from '../services/marketplace/amazonMetrics';

const metricsService = new MockMetricsService();

export function useAmazonMetrics(brandId: string) {
  const [metrics, setMetrics] = useState<BrandMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const data = await metricsService.getBrandMetrics(brandId);
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
        console.error('Failed to fetch Amazon metrics:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [brandId]);

  return { metrics, isLoading, error };
}