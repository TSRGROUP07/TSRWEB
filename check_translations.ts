import { getSupabaseCollection } from './lib/supabase-db';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkTranslations() {
    console.log("Checking properties for translations...");
    try {
        const properties: any[] = await getSupabaseCollection('properties');

        if (!properties || properties.length === 0) {
            console.log("No properties found.");
            return;
        }

        const sample = properties.slice(0, 5);
        sample.forEach(p => {
            console.log(`\nID: ${p.id}`);
            console.log(`Title (Default): ${p.title}`);
            console.log(`Title (EN): ${p.titleEn || p.title_en || '[MISSING]'}`);
            console.log(`Title (RU): ${p.titleRu || p.title_ru || '[MISSING]'}`);
            console.log(`Description (EN) Length: ${p.descriptionEn?.length || p.description_en?.length || 0}`);
        });
    } catch (err) {
        console.error(err);
    }
}

checkTranslations();
