import type { MarketplaceProduct, MarketplaceResponse } from './types';

export class MockMarketplaceService {
  async listProduct(product: MarketplaceProduct): Promise<Record<string, MarketplaceResponse>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const results: Record<string, MarketplaceResponse> = {};

    if (product.marketplaces) {
      for (const marketplace of product.marketplaces) {
        results[marketplace] = {
          success: true,
          marketplaceId: `${marketplace}-${Date.now()}`,
        };
      }
    }

    return results;
  }
}