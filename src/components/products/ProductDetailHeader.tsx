
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, ShoppingCart } from 'lucide-react';
import { InventoryItem } from '../../services/types';

interface ProductDetailHeaderProps {
  product: InventoryItem;
  handleDelete: () => void;
}

const ProductDetailHeader: React.FC<ProductDetailHeaderProps> = ({ product, handleDelete }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <Link to="/products" className="mr-4">
          <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
        </Link>
        <h1 className="text-2xl font-bold">{product.product_name}</h1>
      </div>
      <div className="flex space-x-2">
        <Link
          to={`/products/edit/${product.id}`}
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center"
        >
          <Edit className="mr-2 h-5 w-5" />
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center"
        >
          <Trash2 className="mr-2 h-5 w-5" />
          Delete
        </button>
        <Link
          to={`/sales/new?productId=${product.id}`}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Record Sale
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailHeader;
