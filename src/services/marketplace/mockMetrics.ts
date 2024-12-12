import type { BrandMetrics } from './amazonMetrics';

export class MockMetricsService {
  async getBrandMetrics(brandId: string): Promise<BrandMetrics> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      sales: {
        daily: 2450,
        weekly: 15780,
        monthly: 68900,
        yearToDate: 824500
      },
      performance: {
        orderDefectRate: 0.8,
        lateShipmentRate: 2.1,
        customerFeedback: 4.7
      },
      inventory: {
        inStock: 1245,
        lowStock: 58,
        outOfStock: 12
      },
      advertising: {
        spend: 12450,
        acos: 15.8,
        roas: 6.3,
        impressions: 145800,
        clicks: 7240
      }
    };
  }
}