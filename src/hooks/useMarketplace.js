import { useState } from 'react';
import { MockMarketplaceService } from '../services/marketplace/mockService';

export function useMarketplace() {
  const [isListing, setIsListing] = useState(false);
  const [listingResults, setListingResults] = useState({});

  const marketplaceService = new MockMarketplaceService();

  const listProduct = async (product) => {
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