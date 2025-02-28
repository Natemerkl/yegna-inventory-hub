
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
