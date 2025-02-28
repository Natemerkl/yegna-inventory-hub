
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Trash2, Package, AlertCircle, ShoppingCart } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getInventoryItemById, getSalesByProductId, deleteInventoryItem, InventoryItem, SaleRecord } from '../services/inventory';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<InventoryItem | null>(null);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProductData(id);
    }
  }, [id]);

  const fetchProductData = async (productId: string) => {
    try {
      setLoading(true);
      
      // Fetch product details
      const productData = await getInventoryItemById(productId);
      setProduct(productData);
      
      // Fetch sales history for this product
      const salesData = await getSalesByProductId(productId);
      setSales(salesData);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching product details:', err);
      setError('Failed to load product details. Please try again.');
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!product || !product.id) return;
    
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteInventoryItem(product.id);
        navigate('/products');
      } catch (err) {
        console.error('Error deleting product:', err);
        setError('Failed to delete product. Please try again.');
      }
    }
  };

  const handleRecordSale = () => {
    if (product && product.id) {
      navigate(`/sales/new?productId=${product.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center flex-col">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Product</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => id && fetchProductData(id)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Try Again
            </button>
            <Link 
              to="/products"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center flex-col">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Product Not Found</h3>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/products" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-semibold">Product Details</h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(`/products/edit/${product.id}`)}
                className="flex items-center space-x-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDeleteProduct}
                className="flex items-center space-x-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
              <button
                onClick={handleRecordSale}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Record Sale</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Product Information</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Product Image */}
            <div className="flex justify-center">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.product_name} 
                  className="rounded-lg object-contain max-h-64" 
                />
              ) : (
                <div className="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{product.product_name}</h3>
                {product.sku && (
                  <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                )}
                {product.category && (
                  <div className="mt-2">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                      {product.category}
                    </span>
                  </div>
                )}
              </div>
              
              {product.description && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Description</h4>
                  <p className="mt-1 text-gray-600">{product.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Selling Price</p>
                  <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                </div>
                
                {product.cost_price !== null && product.cost_price !== undefined && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Cost Price</p>
                    <p className="text-lg font-semibold">${product.cost_price.toFixed(2)}</p>
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Current Stock</p>
                  <p className={`text-lg font-semibold ${
                    product.quantity > 10 
                      ? 'text-green-600' 
                      : product.quantity > 0 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                  }`}>
                    {product.quantity} units
                  </p>
                </div>
                
                {product.cost_price !== null && product.cost_price !== undefined && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Profit Margin</p>
                    <p className="text-lg font-semibold">
                      {product.price > 0 && product.cost_price > 0 
                        ? `${Math.round(((product.price - product.cost_price) / product.price) * 100)}%`
                        : 'N/A'}
                    </p>
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Inventory Value</p>
                  <p className="text-lg font-semibold">
                    ${(product.quantity * product.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales History */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Sales History</h2>
        </div>
        <div className="p-6">
          {sales.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No sales recorded for this product yet.</p>
              <button
                onClick={handleRecordSale}
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Record First Sale
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sale Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sales.map((sale) => (
                    <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(sale.sale_date!).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.quantity_sold}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${sale.sale_price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${(sale.quantity_sold * sale.sale_price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.customer_name || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
