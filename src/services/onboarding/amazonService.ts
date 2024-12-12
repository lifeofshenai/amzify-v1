import { SellingPartnerAPI } from 'amazon-sp-api';

export class AmazonService {
  private spApi: SellingPartnerAPI;

  constructor(credentials: any) {
    this.spApi = new SellingPartnerAPI({
      region: credentials.region,
      credentials: {
        SELLING_PARTNER_APP_CLIENT_ID: credentials.clientId,
        SELLING_PARTNER_APP_CLIENT_SECRET: credentials.clientSecret,
        AWS_ACCESS_KEY_ID: credentials.accessKeyId,
        AWS_SECRET_ACCESS_KEY: credentials.secretAccessKey,
        AWS_SELLING_PARTNER_ROLE: credentials.roleArn,
      },
      refresh_token: credentials.refreshToken,
    });
  }

  async validateCredentials() {
    try {
      const response = await this.spApi.callAPI({
        operation: 'catalog.getCatalogItem',
        query: {
          MarketplaceId: process.env.VITE_AMAZON_MARKETPLACE_ID,
        },
      });
      return true;
    } catch (error) {
      console.error('Failed to validate Amazon credentials:', error);
      return false;
    }
  }

  async importProducts() {
    try {
      const response = await this.spApi.callAPI({
        operation: 'catalog.searchCatalogItems',
        query: {
          MarketplaceId: process.env.VITE_AMAZON_MARKETPLACE_ID,
        },
      });
      return response.items;
    } catch (error) {
      console.error('Failed to import Amazon products:', error);
      throw error;
    }
  }

  async getInventoryLevels() {
    try {
      const response = await this.spApi.callAPI({
        operation: 'fbaInventory.getInventorySummaries',
        query: {
          MarketplaceId: process.env.VITE_AMAZON_MARKETPLACE_ID,
        },
      });
      return response.inventorySummaries;
    } catch (error) {
      console.error('Failed to get inventory levels:', error);
      throw error;
    }
  }
}