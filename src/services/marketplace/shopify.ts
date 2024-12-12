import axios from 'axios';
import type { MarketplaceConfig, MarketplaceProduct, MarketplaceResponse } from './types';

export class ShopifyService {
  private config: MarketplaceConfig['shopify'];
  private baseUrl: string;

  constructor(config: MarketplaceConfig['shopify']) {
    this.config = config;
    this.baseUrl = `https://${config?.shopName}.myshopify.com/admin/api/2024-01`;
  }

  async createProduct(product: MarketplaceProduct): Promise<MarketplaceResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/products.json`,
        {
          product: {
            title: product.name,
            body_html: product.description,
            vendor: 'Your Store',
            product_type: '',
            variants: [
              {
                price: product.price,
                sku: product.sku,
                inventory_quantity: product.inventory,
              },
            ],
          },
        },
        {
          headers: {
            'X-Shopify-Access-Token': this.config?.apiSecret,
          },
        }
      );

      return {
        success: true,
        marketplaceId: response.data.product.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create Shopify product',
      };
    }
  }
}