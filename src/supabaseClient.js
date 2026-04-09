import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://irunktocqmuybckegvoy.supabase.co'
const supabaseAnonKey = 'sb_publishable_-k5oTyJecHiBR_pI21dFiA_gQOwhKj8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
