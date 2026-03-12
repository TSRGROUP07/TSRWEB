import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Supabase Setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Helper to convert snake_case to camelCase
function toCamelCase(obj: any) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
    const result: any = {};
    for (const key in obj) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        result[camelKey] = obj[key];
    }
    return result;
}

async function checkTranslations() {
    console.log(`Checking properties in ${supabaseUrl}...`);
    try {
        const { data: properties, error } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) {
            console.error("Supabase Error:", error);
            return;
        }

        if (!properties || properties.length === 0) {
            console.log("No properties found.");
            return;
        }

        console.log(`Found ${properties.length} properties.`);

        properties.forEach((p: any) => {
            console.log(`\nID: ${p.id}`);
            console.log(`Title (Default/TR): ${p.title}`);
            console.log(`Title (EN) [title_en]: ${p.title_en}`);
            console.log(`Title (RU) [title_ru]: ${p.title_ru}`);
            // Check if camelCase conversion would work too
            const camel = toCamelCase(p);
            console.log(`Camel Title (EN) [titleEn]: ${camel.titleEn}`);
        });
    } catch (err) {
        console.error(err);
    }
}

checkTranslations();
