
export class MockMarketplaceService {
  async listProduct(product) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const results = {};

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