
import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getInventoryItemById, recordSale, InventoryItem, SaleRecord } from '../services/inventory';

function RecordSale() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('productId');
  
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<InventoryItem | null>(null);
  
  const [saleData, setSaleData] = useState<Partial<SaleRecord>>({
    inventory_id: productId || '',
    quantity_sold: 1,
    sale_price: 0,
    customer_name: '',
  });

  // Fetch product data if productId is provided in the URL
  useEffect(() => {
    if (productId) {
      fetchProductData(productId);
    }
  }, [productId]);

  const fetchProductData = async (id: string) => {
    try {
      setProductLoading(true);
      const data = await getInventoryItemById(id);
      setProduct(data);
      
      // Pre-fill the sale price with the product's price
      setSaleData(prev => ({
        ...prev,
        sale_price: data.price
      }));
      
      setProductLoading(false);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product data. Please try again.');
      setProductLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'quantity_sold' || name === 'sale_price') {
      const numValue = parseFloat(value);
      setSaleData({
        ...saleData,
        [name]: isNaN(numValue) ? 0 : numValue
      });
    } else if (name === 'inventory_id' && value !== saleData.inventory_id) {
      // If product selection changes, fetch the new product's data
      setSaleData({
        ...saleData,
        inventory_id: value,
        sale_price: 0 // Reset price until we fetch the new product
      });
      
      if (value) {
        fetchProductData(value);
      } else {
        setProduct(null);
      }
    } else {
      setSaleData({
        ...saleData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!saleData.inventory_id) {
      setError('Please select a product.');
      return;
    }
    
    if (!saleData.quantity_sold || saleData.quantity_sold <= 0) {
      setError('Quantity must be greater than zero.');
      return;
    }
    
    if (!saleData.sale_price || saleData.sale_price <= 0) {
      setError('Sale price must be greater than zero.');
      return;
    }
    
    if (product && saleData.quantity_sold > product.quantity) {
      setError(`Only ${product.quantity} units available in stock.`);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      await recordSale(saleData as SaleRecord);
      
      // Navigate back to products page or product detail
      if (productId) {
        navigate(`/products/view/${productId}`);
      } else {
        navigate('/products');
      }
    } catch (err: any) {
      console.error('Error recording sale:', err);
      setError(err.message || 'Failed to record sale. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to={productId ? `/products/view/${productId}` : '/products'} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Record Sale</h1>
          </div>
          <button 
            type="button"
            onClick={() => navigate(productId ? `/products/view/${productId}` : '/products')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>

      {error && (
        <div className="mx-6 mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 max-w-2xl mx-auto">
        <div className="space-y-6">
          {!productId && (
            <div>
              <label htmlFor="inventory_id" className="block text-sm font-medium text-gray-700 mb-1">
                Select Product*
              </label>
              <select
                id="inventory_id"
                name="inventory_id"
                required
                value={saleData.inventory_id || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">-- Select a product --</option>
                {/* In a real app, you would populate this dropdown with products from your inventory */}
              </select>
            </div>
          )}

          {(productLoading && productId) ? (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            </div>
          ) : product ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800">{product.product_name}</h3>
              {product.sku && <p className="text-sm text-gray-500">SKU: {product.sku}</p>}
              <div className="mt-2 flex items-center justify-between">
                <span className={`text-sm ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.quantity} in stock
                </span>
                <span className="text-sm font-medium">${product.price.toFixed(2)} per unit</span>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="quantity_sold" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity*
              </label>
              <input
                type="number"
                id="quantity_sold"
                name="quantity_sold"
                required
                min="1"
                max={product?.quantity || 9999}
                value={saleData.quantity_sold}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div>
              <label htmlFor="sale_price" className="block text-sm font-medium text-gray-700 mb-1">
                Sale Price Per Unit*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="sale_price"
                  name="sale_price"
                  required
                  min="0.01"
                  step="0.01"
                  value={saleData.sale_price}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name (Optional)
            </label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={saleData.customer_name || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter customer name"
            />
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg mt-4">
            <div className="flex justify-between">
              <span className="font-medium">Total Sale Amount:</span>
              <span className="font-bold">
                ${((saleData.quantity_sold || 0) * (saleData.sale_price || 0)).toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading || productLoading}
              className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                loading || productLoading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {loading ? 'Recording Sale...' : 'Complete Sale'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RecordSale;
