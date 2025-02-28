
export interface InventoryItem {
  id?: string;
  product_name: string;
  description?: string;
  sku?: string;
  category?: string;
  quantity: number;
  price: number;
  cost_price?: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  profile_id?: string;
}

export interface SaleRecord {
  id?: string;
  inventory_id: string;
  quantity_sold: number;
  sale_date?: string;
  sale_price: number;
  customer_name?: string;
  profile_id?: string;
}
