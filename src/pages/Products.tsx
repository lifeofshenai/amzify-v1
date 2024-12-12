import React, { useState } from 'react';
import { Plus, Search, Filter, Wand2, RefreshCw } from 'lucide-react';
import ProductForm from '../components/products/ProductForm';
import ProductList from '../components/products/ProductList';
import { useProductStore } from '../stores/productStore';
import { useProductSync } from '../hooks/useProductSync';
import toast from 'react-hot-toast';
import type { ProductFormData } from '../types/product';

export default function Products() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const { products, addProduct } = useProductStore();
  const { importProducts, isImporting } = useProductSync();

  const handleImportProducts = async () => {
    try {
      const importedProducts = await importProducts();
      toast.success('Products imported successfully');
    } catch (error) {
      toast.error('Failed to import products');
    }
  };

  const handleAddProduct = async (data: ProductFormData) => {
    try {
      addProduct({
        ...data,
        fbaEnabled: false,
        reorderPoint: 10,
        leadTime: 7
      });
      toast.success('Product added successfully');
      setShowAddProduct(false);
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleImportProducts}
            disabled={isImporting}
            className="px-4 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 flex items-center"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isImporting ? 'animate-spin' : ''}`} />
            {isImporting ? 'Importing...' : 'Import Products'}
          </button>
          <button
            onClick={() => setShowAddProduct(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </button>
        </div>
      </div>

      {showAddProduct ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
              <button
                onClick={() => setShowAddProduct(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <ProductForm
              onSubmit={handleAddProduct}
              onCancel={() => setShowAddProduct(false)}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
              <Wand2 className="w-4 h-4 mr-2" />
              Optimize All Listings
            </button>
          </div>

          <ProductList products={products} />
        </>
      )}
    </div>
  );
}