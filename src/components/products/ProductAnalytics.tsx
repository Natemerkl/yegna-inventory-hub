
import React from 'react';
import { DollarSign, ShoppingCart, Truck } from 'lucide-react';
import { InventoryItem, SaleRecord } from '../../services/types';

interface ProductAnalyticsProps {
  product: InventoryItem;
  sales: SaleRecord[];
}

const ProductAnalytics: React.FC<ProductAnalyticsProps> = ({ product, sales }) => {
  const totalSales = sales.reduce((total, sale) => total + (sale.sale_price * sale.quantity_sold), 0);
  const unitsSold = sales.reduce((total, sale) => total + sale.quantity_sold, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Analytics</h3>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="h-10 w-10 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-blue-500">Total Sales</p>
              <p className="text-2xl font-bold">
                ${totalSales.toFixed(2)}
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
                {unitsSold}
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
  );
};

export default ProductAnalytics;
