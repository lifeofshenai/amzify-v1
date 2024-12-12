export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  gender: 'Male' | 'Female' | 'Uni-sex' | 'NTL';
  images: string[];
  sizes: {
    [key: string]: {
      stock: number;
      price: number;
      costPrice: number;
    };
  };
  category: string;
  subCategory: string;
  fbaEnabled: boolean;
  reorderPoint: number;
  leadTime: number;
  discount?: {
    value: number;
    type: 'percentage' | 'fixed';
  };
}

export interface ProductFormData {
  name: string;
  brand: string;
  description: string;
  gender: Product['gender'];
  images: File[];
  sizes: Product['sizes'];
  category: string;
  subCategory: string;
  fbaEnabled: boolean;
  reorderPoint: number;
  leadTime: number;
  discount?: Product['discount'];
}

export interface StockAlert {
  productId: string;
  productName: string;
  currentStock: number;
  reorderPoint: number;
  suggestedOrderQuantity: number;
  estimatedStockoutDate: Date;
  priority: 'high' | 'medium' | 'low';
}