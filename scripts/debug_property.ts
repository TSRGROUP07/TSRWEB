
import { getSupabaseCollection } from '../lib/supabase-db';

async function main() {
    try {
        console.log("Fetching properties...");
        const properties = await getSupabaseCollection('properties');

        if (properties.length === 0) {
            console.log("No properties found.");
            return;
        }

        const firstProp = properties[0];
        console.log("First Property ID:", firstProp.id);
        console.log("Keys:", Object.keys(firstProp));
        console.log("Location Data:", {
            location: firstProp.location,
            district: firstProp.district,
            neighborhood: firstProp.neighborhood,
            address: firstProp.address,
            coordinates: firstProp.coordinates
        });

        // Check for potential mismatches
        console.log("All raw keys to see if snake_case exists:", Object.keys(firstProp));
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
