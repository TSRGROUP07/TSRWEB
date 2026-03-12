const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://aahgazecwmylfxbntatf.supabase.co";
// Service role key for bypassing RLS if needed, though anon might work for public reads
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhaGdhemVjd215bGZ4Ym50YXRmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgwNjk4NiwiZXhwIjoyMDg1MzgyOTg2fQ.oQa2PnbQY0GVJ5blc0i9As8oBokKVHYYJA82AFZJGAk";

const supabase = createClient(supabaseUrl, supabaseKey);

async function listProperties() {
    console.log(`Listing properties to check schema...`);

    const { data, error } = await supabase
        .from('properties')
        .select('*');

    if (error) {
        console.error('Error fetching properties:', error);
    } else {
        // Filter for specific Arsa types to catch the one user is likely looking at
        const arsaProps = data.filter(p =>
            (p.property_type && p.property_type.toLowerCase().includes('arsa')) ||
            (p.type && p.type.toLowerCase().includes('arsa'))
        );

        if (arsaProps.length > 0) {
            const fs = require('fs');
            fs.writeFileSync('property_dump_arsa.txt', JSON.stringify(arsaProps[0], null, 2));
            console.log("Arsa property data written to property_dump_arsa.txt");
        } else {
            console.log("No Arsa properties found.");
            // Dump the first one anyway just in case
            const fs = require('fs');
            fs.writeFileSync('property_dump_arsa.txt', JSON.stringify(data[0], null, 2));
        }
    }
}

listProperties();
