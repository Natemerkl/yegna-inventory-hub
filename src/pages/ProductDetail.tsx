
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Package, Edit, Trash2, Tag, ShoppingCart, Truck, DollarSign
} from 'lucide-react';
import { getInventoryItemById, deleteInventoryItem, getSalesByProductId } from '../services/inventory';
import type { InventoryItem, SaleRecord } from '../services/inventory';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<InventoryItem | null>(null);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
      fetchProductSales(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId: string) => {
    try {
      const data = await getInventoryItemById(productId);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductSales = async (productId: string) => {
    try {
      const data = await getSalesByProductId(productId);
      setSales(data);
    } catch (error) {
      console.error('Error fetching product sales:', error);
    }
  };

  const handleDelete = async () => {
    if (!product?.id) return;
    
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteInventoryItem(product.id);
        navigate('/products');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!product) {
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
  }

  return (
    <div>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
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

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Sales History</h3>
            {sales.length === 0 ? (
              <div className="text-center py-6">
                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No sales recorded for this product</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sale Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sales.map((sale) => (
                      <tr key={sale.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(sale.sale_date || '').toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sale.quantity_sold}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${sale.sale_price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sale.customer_name || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Analytics</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="h-10 w-10 text-blue-500 mr-4" />
                  <div>
                    <p className="text-sm text-blue-500">Total Sales</p>
                    <p className="text-2xl font-bold">
                      ${sales.reduce((total, sale) => total + (sale.sale_price * sale.quantity_sold), 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <ShoppingCart className="h-10 w-10 text-green-500 mr-4" />
                  <div>
                    <p className="text-sm text-green-500">Units Sold</p>
                    <p className="text-2xl font-bold">
                      {sales.reduce((total, sale) => total + sale.quantity_sold, 0)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Truck className="h-10 w-10 text-purple-500 mr-4" />
                  <div>
                    <p className="text-sm text-purple-500">Stock Status</p>
                    <p className="text-2xl font-bold">
                      {product.quantity > 10 ? 'In Stock' : product.quantity > 0 ? 'Low Stock' : 'Out of Stock'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
