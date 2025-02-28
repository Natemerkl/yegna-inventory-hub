import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import { 
  getInventoryItemById, 
  addInventoryItem, 
  updateInventoryItem 
} from '../services';
import { uploadProductImage, deleteProductImage } from '../services/imageUpload';
import { useAuth } from '../contexts/AuthContext';
import type { InventoryItem } from '../services/types';

function AddProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = !!id;

  const [product, setProduct] = useState<InventoryItem>({
    product_name: '',
    description: '',
    sku: '',
    quantity: 0,
    price: 0,
    cost_price: 0,
    category: '',
    image_url: '',
    profile_id: user?.id
  });
  
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode && id) {
      fetchProduct(id);
    }
  }, [id, isEditMode]);

  const fetchProduct = async (productId: string) => {
    try {
      const data = await getInventoryItemById(productId);
      setProduct(data);
      if (data.image_url) {
        setImagePreview(data.image_url);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setProduct({
        ...product,
        [name]: value === '' ? '' : Number(value)
      });
    } else {
      setProduct({
        ...product,
        [name]: value
      });
    }
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (!isEditMode) {
      setProduct({
        ...product,
        image_url: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!product.product_name.trim()) {
      newErrors.product_name = 'Product name is required';
    }
    
    if (product.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }
    
    if (product.price < 0) {
      newErrors.price = 'Price cannot be negative';
    }
    
    if (product.cost_price !== undefined && product.cost_price < 0) {
      newErrors.cost_price = 'Cost price cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      let updatedImageUrl = product.image_url;
      
      if (imageFile) {
        setUploading(true);
        
        if (isEditMode && product.image_url) {
          try {
            await deleteProductImage(product.image_url);
          } catch (error) {
            console.error('Error deleting old image:', error);
            // Continue anyway
          }
        }
        
        updatedImageUrl = await uploadProductImage(imageFile);
        setUploading(false);
      }
      
      const productData = {
        ...product,
        image_url: updatedImageUrl,
        profile_id: user?.id
      };
      
      if (isEditMode && id) {
        await updateInventoryItem(id, productData);
      } else {
        await addInventoryItem(productData);
      }
      
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
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
          <Link to="/products" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name*
            </label>
            <input
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.product_name ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter product name"
            />
            {errors.product_name && (
              <p className="text-red-500 text-xs mt-1">{errors.product_name}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={product.description || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SKU
            </label>
            <input
              type="text"
              name="sku"
              value={product.sku || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter SKU"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={product.category || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter category"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity*
            </label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border ${
                errors.quantity ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="0"
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price* ($)
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost Price ($)
            </label>
            <input
              type="number"
              name="cost_price"
              value={product.cost_price || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border ${
                errors.cost_price ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="0.00"
            />
            {errors.cost_price && (
              <p className="text-red-500 text-xs mt-1">{errors.cost_price}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            {imagePreview ? (
              <div className="relative w-64 h-64 border border-gray-300 rounded-md overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-64 h-64 border-2 border-dashed border-gray-300 rounded-md">
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click to upload image
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <Link
            to="/products"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-medium flex items-center"
          >
            {(loading || uploading) && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}
            {isEditMode ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
