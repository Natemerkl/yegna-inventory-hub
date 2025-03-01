
import { supabase } from '../../lib/supabase';
import { InventoryItem } from '../types';

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
  // Ensure profile_id is set
  if (!item.profile_id) {
    console.error('Profile ID is required');
    throw new Error('Profile ID is required');
  }

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

// New function to mark an item as sold and update quantity
export const markItemAsSold = async (id: string, quantitySold: number) => {
  // First get the current item to check available quantity
  const { data: item, error: fetchError } = await supabase
    .from('inventory')
    .select('quantity')
    .eq('id', id)
    .single();
  
  if (fetchError) {
    console.error('Error fetching inventory item for sale:', fetchError);
    throw fetchError;
  }
  
  if (item.quantity < quantitySold) {
    throw new Error(`Not enough items in stock. Only ${item.quantity} available.`);
  }
  
  const newQuantity = item.quantity - quantitySold;
  
  const { data, error } = await supabase
    .from('inventory')
    .update({ 
      quantity: newQuantity,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error marking item as sold:', error);
    throw error;
  }
  
  // Return the updated item
  return data[0];
};
