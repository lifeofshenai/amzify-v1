import { useState } from 'react';
import { MockMarketplaceService } from '../services/marketplace/mockService';
import type { MarketplaceProduct, MarketplaceResponse } from '../services/marketplace/types';

export function useMarketplace() {
  const [isListing, setIsListing] = useState(false);
  const [listingResults, setListingResults] = useState<Record<string, MarketplaceResponse>>({});

  const marketplaceService = new MockMarketplaceService();

  const listProduct = async (product: MarketplaceProduct) => {
    setIsListing(true);
    try {
      const results = await marketplaceService.listProduct(product);
      setListingResults(results);
      return results;
    } catch (error) {
      console.error('Failed to list product:', error);
      throw error;
    } finally {
      setIsListing(false);
    }
  };

  return {
    isListing,
    listingResults,
    listProduct,
  };
}