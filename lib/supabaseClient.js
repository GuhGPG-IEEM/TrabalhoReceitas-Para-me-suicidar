// lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

// Pega a URL e a chave Anon do seu projeto Supabase a partir das variáveis de ambiente.
const supabaseUrl = 'https://cjzdprgpieldcbljcnwn.supabase.co'
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqemRwcmdwaWVsZGNibGpjbnduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODcwNjcsImV4cCI6MjA3MDA2MzA2N30.eXGTOKCmNs8K2nf1g_gAAvBT15jjqRXl487mcvaLJW8"

// Cria e exporta o cliente Supabase.
// Este objeto será usado para fazer todas as suas chamadas para o banco de dados.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)