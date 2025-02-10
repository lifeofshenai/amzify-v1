import { useState } from 'react';
// import { ProductSyncService } from '../services/marketplace/productSync';

export function useProductSync() {
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // const syncService = new ProductSyncService();

  const importProducts = async () => {
    setIsImporting(true);
    setImportError(null);
    try {
      // const products = await syncService.importMarketplaceProducts();
      // return products;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to import products';
      setImportError(message);
      throw error;
    } finally {
      setIsImporting(false);
    }
  };

  return {
    importProducts,
    isImporting,
    importError
  };
}