
import React from 'react';
import { Package, Tag } from 'lucide-react';
import { InventoryItem } from '../../services/types';

interface ProductInfoProps {
  product: InventoryItem;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-6">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-64 rounded-lg object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <Package className="h-16 w-16 text-gray-400" />
            </div>
          )}
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-semibold">{product.product_name}</h2>
          <div className="mt-2 flex items-center">
            <Tag className="h-5 w-5 text-gray-500 mr-2" />
            <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
              {product.category || 'Uncategorized'}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">SKU</p>
              <p className="font-medium">{product.sku || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Quantity</p>
              <p className="font-medium">{product.quantity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">${product.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cost Price</p>
              <p className="font-medium">${product.cost_price?.toFixed(2) || 'N/A'}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Description</p>
            <p className="mt-1">{product.description || 'No description available.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
