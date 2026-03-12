
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
console.log('Key Length:', supabaseServiceKey?.length);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTable() {
    try {
        console.log('Attempting to select from site_videos...');
        const { data, error } = await supabase.from('site_videos').select('*').limit(1);

        if (error) {
            console.error('Error selecting from site_videos:', error);
            if (error.code === '42P01') {
                console.error('Table does not exist!');
                console.log('Attempting to create table...');
                // We cannot create table via client usually, but we can report it.
            }
        } else {
            console.log('Success! Data:', data);
        }

        console.log('Attempting to insert dummy record...');
        const { data: insertData, error: insertError } = await supabase.from('site_videos').insert([{
            type: 'debug_test',
            url: 'http://test.com/video.mp4',
            title: 'Debug Video',
            description: 'Debug Description',
            created_at: new Date().toISOString()
        }]).select();

        if (insertError) {
            console.error('Error inserting:', insertError);
        } else {
            console.log('Insert success:', insertData);
            // Cleanup
            await supabase.from('site_videos').delete().eq('type', 'debug_test');
        }

    } catch (e) {
        console.error('Unexpected error:', e);
    }
}

checkTable();
