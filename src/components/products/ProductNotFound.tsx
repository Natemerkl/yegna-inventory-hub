
import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const ProductNotFound: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700">Product not found</h2>
      <p className="text-gray-500 mt-2">The product you're looking for doesn't exist or has been removed.</p>
      <Link to="/products" className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg">
        Back to Products
      </Link>
    </div>
  );
};

export default ProductNotFound;
