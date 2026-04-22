import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Database integration will be disabled.');
}

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function logOrderToSupabase(orderData: {
  items: any[];
  total: number;
  type: 'delivery' | 'pickup';
  location?: string;
}) {
  if (!supabase) return;

  try {
    const { error } = await supabase
      .from('orders')
      .insert([
        {
          items: orderData.items,
          total_price: orderData.total,
          order_type: orderData.type,
          location_link: orderData.location || null,
          status: 'new'
        },
      ]);

    if (error) throw error;
  } catch (error) {
    console.error('Error logging order to Supabase:', error);
  }
}
