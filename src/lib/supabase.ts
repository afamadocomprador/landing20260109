// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Función para guardar prospectos
export async function saveLead(data: Record<string, unknown>) {
  const { error } = await supabase.from('leads').insert([data])
  if (error) throw error
}
