import { AmazonClient } from './amazonClient';
import type { Product } from '../../types/product';
import { marketplaceConfig } from '../../config/marketplace';

export class ProductSyncService {
  private amazonClient: AmazonClient;

  constructor() {
    this.amazonClient = new AmazonClient(marketplaceConfig.amazon);
  }

  async importMarketplaceProducts(): Promise<Product[]> {
    try {
      const amazonProducts = await this.fetchAmazonProducts();
      return this.transformAmazonProducts(amazonProducts);
    } catch (error) {
      console.error('Failed to import marketplace products:', error);
      throw error;
    }
  }

  private async fetchAmazonProducts() {
    try {
      const response = await fetch(
        'https://sellingpartnerapi.amazon.com/catalog/v0/items',
        {
          headers: {
            'x-amz-access-token': marketplaceConfig.amazon.refreshToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch Amazon products');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch Amazon products:', error);
      throw error;
    }
  }

  private transformAmazonProducts(amazonProducts: any[]): Product[] {
    return amazonProducts.map(product => ({
      id: product.asin,
      name: product.title,
      brand: product.brand,
      description: product.description,
      gender: this.determineGender(product.attributes),
      images: product.images.map((img: any) => img.link),
      sizes: this.transformSizes(product.variations),
      category: product.productType,
      subCategory: product.subProductType
    }));
  }

  private determineGender(attributes: any): Product['gender'] {
    const gender = attributes.targetGender?.toLowerCase();
    if (gender === 'male') return 'Male';
    if (gender === 'female') return 'Female';
    if (gender === 'unisex') return 'Uni-sex';
    return 'NTL';
  }

  private transformSizes(variations: any[]): Product['sizes'] {
    const sizes: Product['sizes'] = {};
    variations.forEach(variation => {
      if (variation.size) {
        sizes[variation.size] = {
          stock: variation.quantity || 0,
          price: variation.price?.amount || 0
        };
      }
    });
    return sizes;
  }
}