import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Definimos la estructura de datos que Jules espera para los Leads
export interface LeadData {
  plan: string;
  frequency: string;
  total_premium: number;
  insured_count: number;
  insured_ages: number[];
  contact_email?: string;
  contact_phone?: string;
}

// Creamos la función saveLead que falta
export async function saveLead(data: LeadData) {
  const { data: result, error } = await supabase
    .from('leads') // Asegúrate de tener una tabla llamada 'leads' en Supabase
    .insert([data])
    .select();

  if (error) throw error;
  return result;
}
