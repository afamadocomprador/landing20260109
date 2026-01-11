import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Definimos una interfaz totalmente abierta para evitar errores de nombres
export interface LeadData {
  [key: string]: any; 
}

export async function saveLead(data: LeadData) {
  // Añadimos un log para ver en la consola de Vercel qué está llegando realmente
  console.log("Datos recibidos para guardar:", data);

  const { data: result, error } = await supabase
    .from('leads')
    .insert([data])
    .select();

  if (error) {
    console.error("Error en Supabase:", error.message);
    // No lanzamos error para que la web no se rompa si falla el guardado
    return null;
  }
  return result;
}
