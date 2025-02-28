import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Package, Loader2 } from 'lucide-react';
import { getInventoryItemById, recordSale } from '../services';
import { useAuth } from '../contexts/AuthContext';
import type { InventoryItem } from '../services/types';

function RecordSale() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState<InventoryItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [salePrice, setSalePrice] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(!!productId);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (id: string) => {
    try {
      const data = await getInventoryItemById(id);
      setProduct(data);
      setSalePrice(data.price);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) ? 0 : value);
    
    if (errors.quantity) {
      setErrors({
        ...errors,
        quantity: ''
      });
    }
  };

  const handleSalePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSalePrice(isNaN(value) ? 0 : value);
    
    if (errors.salePrice) {
      setErrors({
        ...errors,
        salePrice: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!product) {
      newErrors.product = 'Please select a product';
    }
    
    if (quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    
    if (product && quantity > product.quantity) {
      newErrors.quantity = `Only ${product.quantity} items in stock`;
    }
    
    if (salePrice < 0) {
      newErrors.salePrice = 'Sale price cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !product) {
      return;
    }
    
    setLoading(true);
    
    try {
      await recordSale({
        inventory_id: product.id!,
        quantity_sold: quantity,
        sale_price: salePrice,
        customer_name: customerName,
        profile_id: user?.id
      });
      
      navigate(`/products/view/${product.id}`);
    } catch (error) {
      console.error('Error recording sale:', error);
      if (error instanceof Error) {
        setErrors({
          ...errors,
          form: error.message
        });
      }
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link to={product ? `/products/view/${product.id}` : '/products'} className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold">Record Sale</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {errors.form && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {errors.form}
          </div>
        )}
        
        <div className="space-y-6">
          {product ? (
            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
              <div className="h-16 w-16 flex-shrink-0 mr-4">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-md bg-gray-200 flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-500" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium">{product.product_name}</h3>
                <div className="flex space-x-4 mt-1 text-sm text-gray-500">
                  <div>SKU: {product.sku || 'N/A'}</div>
                  <div>Price: ${product.price.toFixed(2)}</div>
                  <div>
                    Stock: 
                    <span className={
                      product.quantity > 10 
                        ? 'text-green-600 ml-1' 
                        : product.quantity > 0 
                          ? 'text-yellow-600 ml-1' 
                          : 'text-red-600 ml-1'
                    }>
                      {product.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-700">
                No product selected. Please go to the products page and select a product to sell.
              </p>
              <Link to="/products" className="text-orange-500 hover:text-orange-700 font-medium mt-2 inline-block">
                Browse Products
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity*
              </label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product?.quantity || 999}
                className={`w-full px-3 py-2 border ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sale Price* ($)
              </label>
              <input
                type="number"
                value={salePrice}
                onChange={handleSalePriceChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border ${
                  errors.salePrice ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
              {errors.salePrice && (
                <p className="text-red-500 text-xs mt-1">{errors.salePrice}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name (Optional)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter customer name"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>${(quantity * salePrice).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <Link
            to={product ? `/products/view/${product.id}` : '/products'}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || !product}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-medium flex items-center disabled:bg-gray-400"
          >
            {loading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}
            Complete Sale
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecordSale;
