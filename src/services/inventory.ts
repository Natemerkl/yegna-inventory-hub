
import { supabase } from '../lib/supabase';

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

// Inventory CRUD operations
export const getInventoryItems = async () => {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
  
  return data;
};

export const getInventoryItemById = async (id: string) => {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching inventory item:', error);
    throw error;
  }
  
  return data;
};

export const addInventoryItem = async (item: InventoryItem) => {
  const { data, error } = await supabase
    .from('inventory')
    .insert([item])
    .select();
  
  if (error) {
    console.error('Error adding inventory item:', error);
    throw error;
  }
  
  return data[0];
};

export const updateInventoryItem = async (id: string, updates: Partial<InventoryItem>) => {
  const { data, error } = await supabase
    .from('inventory')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating inventory item:', error);
    throw error;
  }
  
  return data[0];
};

export const deleteInventoryItem = async (id: string) => {
  const { error } = await supabase
    .from('inventory')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting inventory item:', error);
    throw error;
  }
  
  return true;
};

// Sales CRUD operations
export const getSales = async () => {
  const { data, error } = await supabase
    .from('sales')
    .select(`
      *,
      inventory:inventory_id (product_name, sku)
    `)
    .order('sale_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
  
  return data;
};

export const recordSale = async (sale: SaleRecord) => {
  // First, get the current inventory item to check quantity
  const { data: inventoryItem, error: fetchError } = await supabase
    .from('inventory')
    .select('quantity, id')
    .eq('id', sale.inventory_id)
    .single();
  
  if (fetchError) {
    console.error('Error fetching inventory item for sale:', fetchError);
    throw fetchError;
  }
  
  if (inventoryItem.quantity < sale.quantity_sold) {
    throw new Error('Not enough items in stock');
  }
  
  // Begin a transaction to record sale and update inventory
  const { data, error } = await supabase.rpc('record_sale', { 
    sale_data: sale,
    inventory_id: sale.inventory_id,
    quantity_sold: sale.quantity_sold
  });
  
  if (error) {
    // If RPC doesn't exist yet, we'll do it manually with two separate operations
    // First record the sale
    const { data: saleData, error: saleError } = await supabase
      .from('sales')
      .insert([sale])
      .select();
    
    if (saleError) {
      console.error('Error recording sale:', saleError);
      throw saleError;
    }
    
    // Then update the inventory quantity
    const { error: updateError } = await supabase
      .from('inventory')
      .update({ 
        quantity: inventoryItem.quantity - sale.quantity_sold,
        updated_at: new Date().toISOString()
      })
      .eq('id', sale.inventory_id);
    
    if (updateError) {
      console.error('Error updating inventory after sale:', updateError);
      throw updateError;
    }
    
    return saleData[0];
  }
  
  return data;
};

export const getSaleById = async (id: string) => {
  const { data, error } = await supabase
    .from('sales')
    .select(`
      *,
      inventory:inventory_id (product_name, sku)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching sale:', error);
    throw error;
  }
  
  return data;
};

export const getSalesByProductId = async (inventoryId: string) => {
  const { data, error } = await supabase
    .from('sales')
    .select('*')
    .eq('inventory_id', inventoryId)
    .order('sale_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching sales by product:', error);
    throw error;
  }
  
  return data;
};
