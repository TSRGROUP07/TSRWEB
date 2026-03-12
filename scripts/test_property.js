const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://aahgazecwmylfxbntatf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhaGdhemVjd215bGZ4Ym50YXRmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgwNjk4NiwiZXhwIjoyMDg1MzgyOTg2fQ.oQa2PnbQY0GVJ5blc0i9As8oBokKVHYYJA82AFZJGAk";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
    const id = '5f65cbff-430a-4034-8539-cf98c92b2e8f';
    console.log(`Checking property with ID: ${id}`);

    // Test count first
    const { count, error: countError } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('id', id);

    console.log(`Count result: ${count} for ID ${id}`);

    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id);

    if (error) {
        console.error('Error fetching property:', error);
    } else {
        console.log(`Success! Found ${data.length} properties.`);
        if (data.length > 0) {
            console.log(JSON.stringify(data[0], null, 2));
        }
    }
}

testFetch();
