import { SellingPartnerAPI } from 'amazon-sp-api';
import type { MarketplaceConfig, MarketplaceProduct, MarketplaceResponse } from './types';

export class AmazonService {
  private spApi: SellingPartnerAPI;

  constructor(config: MarketplaceConfig['amazon']) {
    this.spApi = new SellingPartnerAPI({
      region: config?.region,
      credentials: {
        SELLING_PARTNER_APP_CLIENT_ID: config?.accessKey,
        SELLING_PARTNER_APP_CLIENT_SECRET: config?.secretKey,
        AWS_ACCESS_KEY_ID: config?.accessKey,
        AWS_SECRET_ACCESS_KEY: config?.secretKey,
        AWS_SELLING_PARTNER_ROLE: 'arn:aws:iam::*:role/sp-api',
      },
    });
  }

  async createProduct(product: MarketplaceProduct): Promise<MarketplaceResponse> {
    try {
      const response = await this.spApi.callAPI({
        operation: 'catalogItems.createCatalogItem',
        body: {
          productType: 'PRODUCT',
          requirements: 'LISTING',
          attributes: {
            title: product.name,
            description: product.description,
            brand: 'Your Brand',
            recommended_browse_nodes: [],
            generic_keyword: [],
          },
        },
      });

      return {
        success: true,
        marketplaceId: response.catalogId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create Amazon product',
      };
    }
  }
}