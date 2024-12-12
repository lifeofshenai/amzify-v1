import { ShopifyService } from './shopify';
import { AmazonService } from './amazon';
import type { MarketplaceConfig, MarketplaceProduct, MarketplaceResponse } from './types';

export class MarketplaceManager {
  private shopifyService?: ShopifyService;
  private amazonService?: AmazonService;

  constructor(config: MarketplaceConfig) {
    if (config.shopify) {
      this.shopifyService = new ShopifyService(config.shopify);
    }
    if (config.amazon) {
      this.amazonService = new AmazonService(config.amazon);
    }
  }

  async listProduct(product: MarketplaceProduct): Promise<Record<string, MarketplaceResponse>> {
    const results: Record<string, MarketplaceResponse> = {};

    if (product.marketplaces.includes('shopify') && this.shopifyService) {
      results.shopify = await this.shopifyService.createProduct(product);
    }

    if (product.marketplaces.includes('amazon') && this.amazonService) {
      results.amazon = await this.amazonService.createProduct(product);
    }

    return results;
  }
}