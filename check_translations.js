const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local to avoid dependency issues if dotenv is missing (though likely present)
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
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log(`Connecting to Supabase: ${supabaseUrl.slice(0, 20)}...`);

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing credentials.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTranslations() {
    console.log("Fetching properties...");
    const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error("Error:", error);
        return;
    }

    if (!properties || properties.length === 0) {
        console.log("No properties found.");
        return;
    }

    console.log(`Found ${properties.length} properties.`);

    properties.forEach(p => {
        console.log(`\nID: ${p.id}`);
        console.log(`Title (TR): ${p.title}`);
        console.log(`Title (EN) [title_en]: ${p.title_en}`);
        console.log(`Title (RU) [title_ru]: ${p.title_ru}`);
        console.log(`Desc (EN): ${p.description_en ? p.description_en.substring(0, 20) + '...' : 'NULL'}`);
    });
}

checkTranslations();
