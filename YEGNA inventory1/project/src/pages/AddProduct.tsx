
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, AlertCircle } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  addInventoryItem, 
  updateInventoryItem, 
  getInventoryItemById, 
  InventoryItem 
} from '../services/inventory';
import { supabase } from '../lib/supabase';

function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditMode = Boolean(id);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const [productData, setProductData] = useState<InventoryItem>({
    product_name: '',
    description: '',
    sku: '',
    category: '',
    quantity: 0,
    price: 0,
    cost_price: 0,
    image_url: '',
  });
  
  // Fetch product data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      fetchProductData(id);
    }
  }, [isEditMode, id]);

  const fetchProductData = async (productId: string) => {
    try {
      setLoading(true);
      const data = await getInventoryItemById(productId);
      setProductData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product data. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric values
    if (name === 'price' || name === 'cost_price' || name === 'quantity') {
      const numValue = name === 'quantity' ? parseInt(value) : parseFloat(value);
      setProductData({
        ...productData,
        [name]: isNaN(numValue) ? 0 : numValue
      });
    } else {
      setProductData({
        ...productData,
        [name]: value
      });
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `inventory/${fileName}`;
      
      // Upload file to Supabase storage
      const { error: uploadError, data } = await supabase.storage
        .from('inventory')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setUploadProgress(percent);
          },
        });

      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('inventory')
        .getPublicUrl(filePath);
        
      // Update the product data with the image URL
      setProductData({
        ...productData,
        image_url: publicUrl
      });
      
      setIsUploading(false);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      if (isEditMode && id) {
        // Update existing product
        await updateInventoryItem(id, productData);
      } else {
        // Add new product
        await addInventoryItem(productData);
      }
      
      // Navigate back to products page
      navigate('/products');
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again.');
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h1>
          </div>
          <button 
            type="button"
            onClick={() => navigate('/products')}
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

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Basic info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Basic Information</h2>
              
              <div>
                <label htmlFor="product_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name*
                </label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  required
                  value={productData.product_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter product name"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={productData.description || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter product description"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={productData.sku || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter SKU"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={productData.category || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter category"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Selling Price*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      value={productData.price}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cost_price" className="block text-sm font-medium text-gray-700 mb-1">
                    Cost Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      id="cost_price"
                      name="cost_price"
                      min="0"
                      step="0.01"
                      value={productData.cost_price || ''}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity*
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    required
                    min="0"
                    value={productData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Image upload */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Product Image</h2>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-64 
                ${productData.image_url ? 'border-orange-300 bg-orange-50' : 'border-gray-300 hover:border-orange-300'}`}
              >
                {productData.image_url ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={productData.image_url} 
                      alt="Product preview" 
                      className="w-full h-full object-contain" 
                    />
                    <button
                      type="button"
                      onClick={() => setProductData({...productData, image_url: ''})}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <span className="h-4 w-4 block">×</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-500 text-center mb-4">
                      {isUploading 
                        ? `Uploading: ${Math.round(uploadProgress)}%` 
                        : 'Drag and drop your product image here, or click to select a file'}
                    </p>
                    {isUploading ? (
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-orange-500 h-2.5 rounded-full" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={openFileSelector}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Select Image
                      </button>
                    )}
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: JPG, PNG. Maximum file size: 5MB.
              </p>
            </div>
            
            <div className="pt-4 mt-auto">
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-3 font-medium rounded-lg transition-colors ${
                  loading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
