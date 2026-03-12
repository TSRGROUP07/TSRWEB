import { supabase, getSupabaseAdmin } from './supabase';

/**
 * Maps camelCase object keys to snake_case (shallow)
 */
function toSnakeCase(obj: any) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
    const result: any = {};
    for (const key in obj) {
        let value = obj[key];

        // Veritabanı uyumluluğu için boş stringleri veya NaN değerleri null'a çevir
        if (value === "" || (typeof value === 'number' && isNaN(value))) {
            value = null;
        }

        // camelCase to snake_case
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        result[snakeKey] = value;
    }
    return result;
}

/**
 * Maps snake_case object keys to camelCase (shallow)
 * Note: Nested objects (like JSONB coordinates) are preserved as-is
 */
function toCamelCase(obj: any) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
    const result: any = {};
    for (const key in obj) {
        // snake_case to camelCase
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        // Preserve nested objects (like JSONB coordinates) as-is
        result[camelKey] = obj[key];
    }
    return result;
}

/**
 * Supabase'dan koleksiyon (tablo) verilerini çeker
 */
export async function getSupabaseCollection(
    tableName: string,
    options: {
        limit?: number;
        order?: { column: string; ascending: boolean };
        filters?: { column: string; operator: 'eq' | 'neq' | 'in'; value: any }[];
        select?: string;
    } = {}
) {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'unknown').slice(-5);
        const { limit, order, filters, select = '*' } = options;

        console.log(`🔍 [Supabase DB] Fetching ${tableName} from project ...${url} ${limit ? `(limit: ${limit})` : ''}`);

        let query = supabaseAdmin
            .from(tableName)
            .select(select);

        // Apply filters
        if (filters && filters.length > 0) {
            filters.forEach(f => {
                if (f.operator === 'eq') query = query.eq(f.column, f.value);
                else if (f.operator === 'neq') query = query.neq(f.column, f.value);
                else if (f.operator === 'in') query = query.in(f.column, f.value);
            });
        }

        if (order) {
            query = query.order(order.column, { ascending: order.ascending });
        } else {
            query = query.order('created_at', { ascending: false });
        }

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error, status, statusText } = await query;

        if (error) {
            console.error(`Supabase getCollection error (${tableName}):`, {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
                status,
                statusText
            });
            return [];
        }

        if (data) {
            console.log(`✅ [Supabase DB] ${tableName} fetch success: ${data.length} rows`);
            if (data.length === 0) {
                console.log(`⚠️  [Supabase DB] Warning: ${tableName} table exists but returned zero rows. Check RLS or if you are in the correct project.`);
            }
        }
        return (data || []).map((item: any) => toCamelCase(item));
    } catch (error) {
        console.error(`Supabase getCollection catch error (${tableName}):`, error);
        return [];
    }
}

/**
 * Supabase'a yeni döküman (satır) ekler
 */
export async function addToSupabaseCollection(tableName: string, item: any) {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const snakeCaseItem = toSnakeCase(item);
        console.log(`💾 [Supabase DB] Inserting into ${tableName} at project ...${(process.env.NEXT_PUBLIC_SUPABASE_URL || 'unknown').slice(-5)}`);
        const { data, error } = await supabaseAdmin
            .from(tableName)
            .insert([snakeCaseItem])
            .select();

        if (error) {
            console.error(`Supabase addToCollection error (${tableName}):`, error);
            throw error;
        }

        return toCamelCase(data[0]);
    } catch (error) {
        console.error(`Supabase addToCollection catch error (${tableName}):`, error);
        throw error;
    }
}

/**
 * Supabase'da döküman (satır) günceller
 */
export async function updateInSupabaseCollection(tableName: string, id: string, data: any) {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const snakeCaseData = toSnakeCase(data);
        console.log(`📝 [Supabase DB] Updating ${tableName} (ID: ${id}) at project ...${(process.env.NEXT_PUBLIC_SUPABASE_URL || 'unknown').slice(-5)}`);
        const { data: updatedData, error } = await supabaseAdmin
            .from(tableName)
            .update(snakeCaseData)
            .eq('id', id)
            .select();

        if (error) {
            console.error(`Supabase updateInCollection error (${tableName}/${id}):`, error);
            throw error;
        }

        return toCamelCase(updatedData[0]);
    } catch (error) {
        console.error(`Supabase updateInCollection catch error (${tableName}/${id}):`, error);
        throw error;
    }
}

/**
 * Supabase'dan döküman (satır) siler
 */
export async function deleteFromSupabaseCollection(tableName: string, id: string) {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        console.log(`🗑️ [Supabase DB] Deleting from ${tableName} (ID: ${id}) at project ...${(process.env.NEXT_PUBLIC_SUPABASE_URL || 'unknown').slice(-5)}`);
        const { error } = await supabaseAdmin
            .from(tableName)
            .delete()
            .eq('id', id);

        if (error) {
            console.error(`Supabase deleteFromCollection error (${tableName}/${id}):`, error);
            throw error;
        }

        return true;
    } catch (error) {
        console.error(`Supabase deleteFromCollection catch error (${tableName}/${id}):`, error);
        throw error;
    }
}

/**
 * ID'ye göre tek bir döküman getirir
 */
export async function getSupabaseById(tableName: string, id: string) {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        console.log(`🔍 [Supabase DB] Fetching single ${tableName} (ID: ${id}) at project ...${(process.env.NEXT_PUBLIC_SUPABASE_URL || 'unknown').slice(-5)}`);
        const { data, error } = await supabaseAdmin
            .from(tableName)
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Supabase getById error (${tableName}/${id}):`, error);
            return null;
        }

        // Debug: Log raw data before camelCase conversion
        console.log(`🔍 [Supabase DB] Raw data for ${id}:`, {
            hasCoordinates: !!data?.coordinates,
            coordinatesType: typeof data?.coordinates,
            coordinates: data?.coordinates,
            coordinatesKeys: data?.coordinates ? Object.keys(data.coordinates) : null
        });

        const camelCaseData = toCamelCase(data);

        // Debug: Log after camelCase conversion
        console.log(`🔍 [Supabase DB] After camelCase for ${id}:`, {
            hasCoordinates: !!camelCaseData?.coordinates,
            coordinatesType: typeof camelCaseData?.coordinates,
            coordinates: camelCaseData?.coordinates
        });

        return camelCaseData;
    } catch (error) {
        console.error(`Supabase getById catch error (${tableName}/${id}):`, error);
        return null;
    }
}

/**
 * Tablodaki toplam kayıt sayısını döner
 */
export async function getSupabaseCount(tableName: string) {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { count, error } = await supabaseAdmin
            .from(tableName)
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error(`Supabase getCount error (${tableName}):`, error);
            return 0;
        }

        return count || 0;
    } catch (error) {
        console.error(`Supabase getCount catch error (${tableName}):`, error);
        return 0;
    }
}

