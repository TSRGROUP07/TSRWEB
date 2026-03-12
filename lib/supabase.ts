import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Browser client (kısıtlı yetki, anon key ile)
// Not: build sırasında URL yoksa hata vermemesi için kontrol ekliyoruz
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null as any;

// Admin client (full yetki, service role key ile) - Sadece server-side
export const getSupabaseAdmin = () => {
    if (typeof window !== 'undefined') {
        throw new Error('Supabase admin client can only be used on the server side.');
    }

    if (!supabaseUrl || (!supabaseServiceRoleKey && !supabaseAnonKey)) {
        throw new Error('Supabase configuration missing (URL or Service Role Key). Check environment variables.');
    }

    const keyToUse = supabaseServiceRoleKey || supabaseAnonKey;
    const isServiceKey = !!supabaseServiceRoleKey;

    // Server-side logging to catch environment desync
    if (typeof window === 'undefined') {
        console.log(`🔌 [Supabase Client] Initializing for project ...${supabaseUrl.slice(-10)}`);
        console.log(`🔌 [Supabase Client] Using ${isServiceKey ? 'SERVICE_ROLE' : 'ANON'} key (Length: ${keyToUse.length})`);

        if (isServiceKey && (supabaseServiceRoleKey.length < 50 || supabaseServiceRoleKey.startsWith('sb_secret_'))) {
            console.error('❌ CRITICAL: SUPABASE_SERVICE_ROLE_KEY looks like a JWT Secret or is too short! This will cause RLS issues.');
        }
    }

    return createClient(supabaseUrl, keyToUse);
};
