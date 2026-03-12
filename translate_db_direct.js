const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                process.env[match[1].trim()] = match[2].trim();
            }
        });
    }
} catch (e) {
    console.error("Error reading .env.local", e);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const keyToUse = serviceRoleKey || anonKey;

console.log(`Using credentials: URL=${supabaseUrl.slice(0, 5)}... Key=${serviceRoleKey ? 'SERVICE_ROLE' : 'ANON'} (Length: ${keyToUse ? keyToUse.length : 0})`);

if (!supabaseUrl || !keyToUse) {
    console.error("Missing credentials.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, keyToUse, {
    auth: { autoRefreshToken: false, persistSession: false }
});

// MyMemory API Translation
async function translateText(text, targetLang, sourceLang = 'tr') {
    if (!text || text.trim().length === 0) return text;
    if (sourceLang === targetLang) return text;

    // Max length for free API per request is around 500 chars usually for GET
    // Truncate if necessary for safety, but try full text first.
    const textToTranslate = text.length > 500 ? text.substring(0, 500) : text;

    try {
        const langPair = `${sourceLang}|${targetLang}`;
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${langPair}`;

        // Add User-Agent if possible or email? MyMemory recommends email for more quota
        // But fetch doesn't support setting headers easily in Node 18 native fetch unless options provided?
        // Native fetch supports headers.
        const response = await fetch(url);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();
        if (data.responseStatus === 200 && data.responseData?.translatedText) {
            return data.responseData.translatedText;
        }

        return text; // Fallback to original
    } catch (error) {
        console.error(`  ⚠️ Translation error for '${text.substring(0, 10)}...':`, error.message);
        return text;
    }
}

async function run() {
    console.log("Fetching properties...");

    // Backfill properties missing title_en
    const { data: properties, error } = await supabase
        .from('properties')
        .select('id, title, description, location') // Explicit columns
        .is('title_en', null)
        .order('created_at', { ascending: false })
        .limit(50); // Increased limit

    if (error) {
        console.error("Error fetching:", error);
        return;
    }

    if (!properties || properties.length === 0) {
        console.log("No properties found needing translation.");
        return;
    }

    console.log(`Found ${properties.length} properties to translate.`);

    let count = 0;
    for (const p of properties) {
        count++;
        console.log(`[${count}/${properties.length}] Translating ID: ${p.id} (${p.title?.substring(0, 30)}...)`);

        const updates = {};

        try {
            // Title
            if (p.title) {
                updates.title_en = await translateText(p.title, 'en');
                updates.title_ru = await translateText(p.title, 'ru');
            }

            // Description (Only translate if exists)
            if (p.description) {
                updates.description_en = await translateText(p.description, 'en');
                updates.description_ru = await translateText(p.description, 'ru');
            }

            // Location
            if (p.location) {
                updates.location_en = await translateText(p.location, 'en');
                updates.location_ru = await translateText(p.location, 'ru');
            }

            if (Object.keys(updates).length > 0) {
                const { error: updateError } = await supabase
                    .from('properties')
                    .update(updates)
                    .eq('id', p.id); // 204 OK is success

                if (updateError) {
                    console.error(`  ❌ Failed to update ${p.id}:`, updateError.message);
                    if (updateError.code) console.error(`     Code: ${updateError.code}`);
                } else {
                    console.log(`  ✅ Updated`);
                }
            }
        } catch (err) {
            console.error(`  ❌ Failed processing ${p.id}:`, err);
        }

        // Delay 1s to be polite
        await new Promise(r => setTimeout(r, 1000));
    }
}

run().catch(err => {
    console.error("FATAL SCRIPT ERROR:", err);
    process.exit(1);
});
