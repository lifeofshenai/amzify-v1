import type { AmazonConfig } from '../../config/marketplace';

export interface BrandMetrics {
  sales: {
    daily: number;
    weekly: number;
    monthly: number;
    yearToDate: number;
  };
  performance: {
    orderDefectRate: number;
    lateShipmentRate: number;
    customerFeedback: number;
  };
  inventory: {
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
  advertising: {
    spend: number;
    acos: number;
    roas: number;
    impressions: number;
    clicks: number;
  };
}

export class AmazonMetricsService {
  private config: AmazonConfig;

  constructor(config: AmazonConfig) {
    this.config = config;
  }

  async getBrandMetrics(brandId: string): Promise<BrandMetrics> {
    try {
      // In a real implementation, this would make API calls to Amazon SP-API
      // using the brandId to filter metrics for specific vendor
      const response = await fetch(
        `https://sellingpartnerapi.amazon.com/brands/${brandId}/metrics`,
        {
          headers: {
            'x-amz-access-token': this.config.refreshToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch brand metrics');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch Amazon brand metrics:', error);
      throw error;
    }
  }
}