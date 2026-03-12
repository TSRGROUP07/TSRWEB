
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local to avoid dotenv dependency
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envConfig = {};

envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["'](.*)["']$/, '$1'); // Remove quotes
        envConfig[key] = value;
    }
});

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase URL or Key missing in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Translation function (mocking the one in lib/translation.ts)
async function translateText(text, targetLang) {
    if (!text) return '';
    // Free MyMemory API
    const source = 'tr';
    const target = targetLang;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.responseStatus === 200 && data.responseData?.translatedText) {
            return data.responseData.translatedText;
        }
        return text;
    } catch (e) {
        console.error(`Translation error for "${text.substring(0, 20)}...":`, e.message);
        return text; // Fallback to original
    }
}

async function run() {
    console.log('🚀 Starting translation backfill...');

    // 1. Get properties that need translation
    const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .or('title_en.is.null,title_en.eq.""');

    if (error) {
        console.error('❌ Error fetching properties:', error);
        return;
    }

    console.log(`📊 Found ${properties.length} properties needing translation.`);

    const limit = 20;
    const toProcess = properties.slice(0, limit);

    for (const property of toProcess) {
        console.log(`\nProcessing ID: ${property.id} - ${property.title?.substring(0, 30)}...`);

        const updates = {};
        let hasUpdates = false;

        // Helper to translate a field if missing
        const processField = async (fieldName, val) => {
            if (!val) return;

            // English
            if (!property[`${fieldName}_en`]) {
                const translated = await translateText(val, 'en');
                updates[`${fieldName}_en`] = translated;
                hasUpdates = true;
                console.log(`  - EN ${fieldName}: ${translated.substring(0, 20)}...`);
                await new Promise(r => setTimeout(r, 1000)); // Rate limit
            }

            // Russian
            if (!property[`${fieldName}_ru`]) {
                const translated = await translateText(val, 'ru');
                updates[`${fieldName}_ru`] = translated;
                hasUpdates = true;
                console.log(`  - RU ${fieldName}: ${translated.substring(0, 20)}...`);
                await new Promise(r => setTimeout(r, 1000)); // Rate limit
            }

            // Bosnian
            if (!property[`${fieldName}_bs`]) {
                const translated = await translateText(val, 'bs');
                updates[`${fieldName}_bs`] = translated;
                hasUpdates = true;
                console.log(`  - BS ${fieldName}: ${translated.substring(0, 20)}...`);
                await new Promise(r => setTimeout(r, 1000)); // Rate limit
            }
        };

        await processField('title', property.title);
        await processField('description', property.description);
        await processField('location', property.location);

        if (hasUpdates) {
            const { error: updateError } = await supabase
                .from('properties')
                .update(updates)
                .eq('id', property.id);

            if (updateError) {
                console.error(`❌ Failed to update property ${property.id}:`, updateError);
            } else {
                console.log(`✅ Updated property ${property.id}`);
            }
        } else {
            console.log(`ℹ️ No updates needed for ${property.id}`);
        }
    }

    console.log('\n✨ Backfill batch complete!');
}

run();
