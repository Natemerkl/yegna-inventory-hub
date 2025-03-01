
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInventoryItemById, deleteInventoryItem, getSalesByProductId } from '../services';
import type { InventoryItem, SaleRecord } from '../services/types';

// Import our new components
import ProductDetailHeader from '../components/products/ProductDetailHeader';
import ProductInfo from '../components/products/ProductInfo';
import SalesHistory from '../components/products/SalesHistory';
import ProductAnalytics from '../components/products/ProductAnalytics';
import ProductNotFound from '../components/products/ProductNotFound';
import LoadingSpinner from '../components/products/LoadingSpinner';

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
    return <LoadingSpinner />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <div>
      <ProductDetailHeader product={product} handleDelete={handleDelete} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ProductInfo product={product} />
          <SalesHistory sales={sales} />
        </div>

        <div className="md:col-span-1">
          <ProductAnalytics product={product} sales={sales} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
