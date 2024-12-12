import { create } from 'zustand';
import type { Product, ProductFormData } from '../types/product';

interface ProductState {
  products: Product[];
  addProduct: (product: ProductFormData) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [
    {
      id: 'P001',
      name: 'Premium Cotton T-Shirt',
      brand: 'EcoWear',
      description: 'Sustainable cotton t-shirt with modern fit',
      gender: 'Uni-sex',
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'],
      sizes: {
        'S': { stock: 25, price: 29.99, costPrice: 8.50 },
        'M': { stock: 15, price: 29.99, costPrice: 8.50 },
        'L': { stock: 30, price: 29.99, costPrice: 8.50 },
        'XL': { stock: 20, price: 29.99, costPrice: 8.50 }
      },
      category: 'Apparel',
      subCategory: 'T-Shirts',
      fbaEnabled: true,
      reorderPoint: 20,
      leadTime: 14
    }
  ],
  addProduct: (productData) => set((state) => {
    // Convert File objects to URLs for images
    const imageUrls = productData.images.map(file => {
      if (file instanceof File) {
        return URL.createObjectURL(file);
      }
      return file;
    });

    const newProduct: Product = {
      ...productData,
      id: `P${String(state.products.length + 1).padStart(3, '0')}`,
      images: imageUrls,
    };

    return {
      products: [...state.products, newProduct]
    };
  }),
  updateProduct: (id, productData) => set((state) => ({
    products: state.products.map((product) =>
      product.id === id ? { ...product, ...productData } : product
    )
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((product) => product.id !== id)
  }))
}));