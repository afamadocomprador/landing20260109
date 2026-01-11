import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// He ampliado esta interfaz para que coincida exactamente con lo que envía tu calculadora
export interface LeadData {
  plan: string;
  frecuencia_pago: string; // Antes era frequency
  adultos: number;
  menores_14: number;
  total_recibo: number;
  insured_count?: number;
  insured_ages?: number[];
  contact_email?: string;
  contact_phone?: string;
  [key: string]: any; // Esta línea permite que si Jules envía algo más, no dé error
}

export async function saveLead(data: LeadData) {
  const { data: result, error } = await supabase
    .from('leads')
    .insert([data])
    .select();

  if (error) {
    console.error("Error guardando en Supabase:", error);
    throw error;
  }
  return result;
}
