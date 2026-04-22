import { getSupabaseAdmin } from './supabase';

/**
 * Supabase Storage'a dosya yükler
 * @param file Dosya buffer'ı
 * @param fileName Dosya adı
 * @param bucket Bucket adı (varsayılan: properties)
 * @returns Yüklenen dosyanın public URL'si
 */
export async function uploadToSupabaseStorage(
    file: Buffer | Blob,
    fileName: string,
    bucket: string = 'properties'
) {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
            cacheControl: '31536000',
            upsert: true
        });

    if (error) {
        console.error('Supabase upload error:', error);
        throw error;
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

    return publicUrl;
}

/**
 * Supabase Storage'dan dosya siler
 */
export async function deleteFromSupabaseStorage(
    filePath: string,
    bucket: string = 'properties'
) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
        console.error('Supabase delete error:', error);
        throw error;
    }
}
