
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/product';

function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [product, setProduct] = useState<Product>({
    product_name: '',
    description: '',
    sku: '',
    quantity: 0,
    price: 0,
    cost_price: 0,
    category: '',
    image_url: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch product details if in edit mode
  useEffect(() => {
    async function fetchProduct() {
      if (isEditMode) {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .eq('id', id)
            .single();

          if (error) throw error;
          if (data) {
            setProduct(data);
            if (data.image_url) {
              setImagePreview(data.image_url);
            }
          }
        } catch (error) {
          console.error('Error fetching product:', error);
          setError('Failed to fetch product details');
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchProduct();
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // For number inputs, convert value to number
    if (type === 'number') {
      setProduct(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setProduct(prev => ({ ...prev, image_url: '' }));
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // If there's a new image file, upload it first
      let imageUrl = product.image_url;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const productData = { ...product, image_url: imageUrl };
      
      // For now, we'll use a random profile_id
      // In a real app, this would come from authentication
      if (!isEditMode) {
        productData.profile_id = '00000000-0000-0000-0000-000000000000';
      }

      let result;
      if (isEditMode) {
        result = await supabase
          .from('inventory')
          .update(productData)
          .eq('id', id);
      } else {
        result = await supabase
          .from('inventory')
          .insert([productData]);
      }

      if (result.error) throw result.error;

      setSuccess(isEditMode ? 'Product updated successfully!' : 'Product added successfully!');
      
      // Navigate back to products list after a short delay
      setTimeout(() => {
        navigate('/products');
      }, 2000);
      
    } catch (error) {
      console.error('Error saving product:', error);
      setError('Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="product_name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name*
              </label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                value={product.product_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description || ''}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={product.sku || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
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
                value={product.category || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity*
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Sale Price*
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="cost_price" className="block text-sm font-medium text-gray-700 mb-1">
                Cost Price
              </label>
              <input
                type="number"
                id="cost_price"
                name="cost_price"
                value={product.cost_price || ''}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              
              {imagePreview ? (
                <div className="relative mt-2 w-full h-40 border border-gray-300 rounded overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Product preview" 
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="mt-2">
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-orange-500"
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">Click to upload image</span>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
          >
            {isLoading
              ? 'Saving...'
              : isEditMode
                ? 'Update Product'
                : 'Add Product'
            }
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
