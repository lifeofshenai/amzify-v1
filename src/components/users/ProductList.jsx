import React from 'react';
import { Edit2, Trash2, ExternalLink, Wand2 } from 'lucide-react';
import SalesChannelIcon from '../common/SalesChannelIcon';

export default function ProductList({ products }) {
  const getSalesChannelIcons = (product) => {
    const channels = [];
    
    if (product.fbaEnabled) {
      channels.push(
        <div key="amazon" title="Amazon FBA">
          <SalesChannelIcon channel="amazon" size={20} />
        </div>
      );
    }
    
    channels.push(
      <div key="ecommerce" title="E-commerce">
        <SalesChannelIcon channel="ecommerce" size={20} />
      </div>
    );
    
    channels.push(
      <div key="tiktok" title="TikTok Shop">
        <SalesChannelIcon channel="tiktok" size={20} />
      </div>
    );

    return (
      <div className="flex space-x-3">
        {channels}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Brand</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Cost</th>
              <th className="px-6 py-4 font-medium">Sales Channels</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => {
              const totalStock = Object.values(product.sizes).reduce(
                (sum, size) => sum + size.stock,
                0
              );
              const basePrice = Object.values(product.sizes)[0]?.price;
              const baseCost = Object.values(product.sizes)[0]?.costPrice;

              return (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.brand}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.category} / {product.subCategory}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`text-sm ${totalStock <= product.reorderPoint ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                        {totalStock}
                      </span>
                      {totalStock <= product.reorderPoint && (
                        <span className="text-xs text-red-600">Low Stock</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">${basePrice}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">${baseCost}</td>
                  <td className="px-6 py-4">
                    {getSalesChannelIcons(product)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="p-1 text-gray-400 hover:text-primary-600">
                        <Wand2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-primary-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-primary-600">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}